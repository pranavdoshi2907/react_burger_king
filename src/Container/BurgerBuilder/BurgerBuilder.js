import React, { Component } from 'react'
import { connect} from 'react-redux'

import Aux from '../../hoc/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'


 class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            // purchasable : false,
            purchasing : false,
            // loading : false,
            // error : false
        }
    }

    componentDidMount(){
        console.log(this.props)
        this.props.onInitIngredient()
        // axios.get('ingredients.json')
        // .then(res => {
        //     this.setState({
        //         ingredients : res.data
        //     })
        // })
        // .catch(err => {
        //     this.setState({
        //         error : err
        //     })
        // })
    }
 
    updatePurchaseState = () => {
        const ingredients = {
            ...this.props.ings
        }
        const sum = Object.keys(ingredients)
                    .map((igKey) => {
                        return ingredients[igKey]
                    })
                    .reduce((sum,ele)=> {
                        return sum + ele 
                    },0)
        console.log(sum)
        console.log(Object.keys(ingredients)
            .map((igKey) => {
            return ingredients[igKey]
            }) )

        // this.setState({purchasable : sum > 0})  
        return sum > 0 ;  
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type]
    //     const updatedCount = oldCount + 1
    //     const updatedIngredients ={
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]//oldprice+PriceOfAddationOfOneIngredient
    //     this.setState({
    //         ingredients : updatedIngredients,
    //         totalPrice : newPrice           
    //     })
    //     this.updatePurchaseState(updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type]
    //     if (oldCount <= 0 ) {
    //         return ;
    //     }
    //     const updatedCount = oldCount - 1
    //     const updatedIngredients ={
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]//oldprice+PriceOfAddationOfOneIngredient
    //     this.setState({
    //         ingredients : updatedIngredients,
    //         totalPrice : newPrice            
    //     })
    //     this.updatePurchaseState(updatedIngredients)
    // }
   
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing : true
            })    
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('./auth')
        }
        
    } 
   
    purchaseCancelHandler = () => {
        this.setState({
            purchasing : false
        })
    }

    purchaseContinueHandler = () => {
        // alert('you continue')
        // this.setState({
        //     loading : true
        // })
        // const order ={
        //     ingredients : this.props.ings,
        //     price : this.state.totalPrice,
        //     customer : {
        //         name : 'pranav',
        //         address : {
        //           street : 'Raigad',
        //           zipCode : '9999',
        //           country : 'India'
        //         },
        //         email : 'p@g.c'
        //     },
        //     deliveryMethod : 'fast'
        // }
        // axios.post('/orders.json',order)
        // .then(res => {
        //     console.log(res)
        //     this.setState({
        //         loading : false,
        //         purchasing : false
        //     })
        // })
        // .catch(err => {
        //     console.log(err)
        //     this.setState({
        //         lo ading : false,
        //         purchasing : false
        //     })
        // })
        const queryParams = []
        for(let i in this.props.ings){
            // console.log(encodeURIComponent(i),i)
            // console.log(encodeURIComponent(this.props.ings[i]),i)
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        }
        
        queryParams.push('price='+this.props.price)
        console.log(queryParams)
        
        const queryString = queryParams.join('&')
        this.props.onInitPurchase()
        this.props.history.push({
            pathname: '/checkout',
            search : '?'  + queryString
         })
        
    }
    render() {
     
    console.log(this.props.ings)
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            // console.log(disabledInfo[key]) //count
            // console.log(key)//key
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        console.log(disabledInfo) //{'salad':true,'meat':false......}
        let orderSummary =  null
        let burger = this.props.error ? <p>ingredients Not Loaded..</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger  ingredients={this.props.ings}/>
                    <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoves} 
                    disabled={disabledInfo} 
                    purchasable={this.updatePurchaseState()}
                    price={this.props.price} 
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}  /> 
                </Aux>
            );
            orderSummary =  <OrderSummary ingredients={this.props.ings}
                            price={this.props.price.toFixed(2) }
                            purchaseCancelled={this.purchaseCancelHandler} 
                            purchaseContinued={this.purchaseContinueHandler}/> 
        }
        // if(this.state.loading){
        //     orderSummary = <Spinner />
        // }
                             
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler }>
                       {orderSummary}
                </Modal>
            {burger}     
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null

    }
}

const mapDispatchToProps = dispatch => {
    return {
         onIngredientAdded : (igName) => dispatch(actions.addIngredient(igName)),
         onIngredientRemoves : (igName) => dispatch(actions.removeIngredient(igName)),
         onInitIngredient : () => dispatch(actions.initIngredient()),
         onInitPurchase : () => dispatch(actions.purchaseInit()),
         onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
        }
    }
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
