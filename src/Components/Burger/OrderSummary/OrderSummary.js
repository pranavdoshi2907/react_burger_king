import React, { Component } from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class  OrderSummary extends Component {
  
    componentWillUpdate(){
        console.log('[orderSummary.js] componentWillUpdate')
    }

        render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
          .map((igKey) => {
                 return <li key={igKey}>
                          <span style={{textTransform : 'capitalize'}}>{igKey}</span> 
                          : {this.props.ingredients[igKey]}
                       </li>
            })

            return (
            <Aux>
            <h3>order</h3>
              <ul>
                  {ingredientSummary}
              </ul>
              <p><strong>Total Price : {this.props.price}</strong></p>
              <Button btnType="Danger"
               clicked={this.props.purchaseCancelled} >Cancel</Button>
              <Button btnType="Success" 
              clicked={this.props.purchaseContinued} >continue</Button>
        </Aux>
 
        )
    }
} 

export default OrderSummary
