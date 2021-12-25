import React, { Component } from 'react'
import { connect} from 'react-redux'

import Order from './Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../Components/UI/Spinner/Spinner'

class Orders extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
              orders : [],
              loading : true
        }
    }
    
    componentDidMount() {
        this.props.onFetchOrder(this.props.token, this.props.userId )
        // axios.get('/orders.json')
        // .then(res => {
        //     const fetchedOrders = []
        //     console.log(res.data)
        //     for(let key in res.data){
        //         fetchedOrders.push({...res.data[key],
        //             id : key})
        //     }
        //     this.setState({
        //         loading : false,
        //         orders : fetchedOrders
        //     })
        // })
        // .catch(err => {
        //     this.setState({
        //         loading : false
        //     })
        // })
    }
    render() {
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.orders.map(order=> 
                         (
                            <Order key={order.id} 
                            ingredients={order.ingredients}
                            price={Number.parseFloat(order.price.toFixed(2)) } />
                         )
                        )
        }
        return orders

        
    }
}

const mapStateToProps = state => {
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder : (token, userId) => dispatch( actions.fetchOrders(token,userId) )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios)) 
