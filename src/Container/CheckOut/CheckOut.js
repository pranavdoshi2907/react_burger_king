import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route,Redirect } from 'react-router-dom'

import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
// import * as actions from '../../store/actions/index'

export class CheckOut extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ingredients : null,
            price : 0
        }
    }

    // componentWillMount(){
        // this.props.onInitPurchase();
        // const query = new URLSearchParams(this.props.location.search)
        // console.log(query)
        // const ingredients = {}
        // let price = 0
        // console.log(query.entries())
        // for(let params of query.entries()){
        //     if (params[0]  === 'price') {
        //         price = params[1]
        //     } else {
        //         ingredients[params[0]] = +params[1]        
        //     }
        // }
        // console.log(ingredients)
        // this.setState({
        //     ingredients : ingredients,
        //     totalPrice : price
        //  })
    // }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = (
            <div>    
                {purchasedRedirect}
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutContinued={this.checkoutContinuedHandler}
                checkoutCancelled={this.checkoutCancelledHandler}/>

                <Route path={this.props.match.path + '/contact-data'}  
                component={ContactData}
                // render={(props) => <ContactData  ingredients={this.props.ings} price={this.state.price} {...props} />}
                 />
            </div>
            )
        }
        return summary; 
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase : () => dispatch(actions.purchaseInit())
//     }
// }
export default connect(mapStateToProps)(CheckOut)
