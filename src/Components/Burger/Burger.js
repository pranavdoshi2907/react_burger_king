import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    console.log(props)
    console.log(props.ingredients)
    let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
       return [...Array(props.ingredients[igKey])].map((_,i) => { 
          return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })
    .reduce((arr,ele) => {
        // console.log(arr)
        // console.log(ele)
        return arr.concat(ele)
    },[]);
    if(transformedIngredients.length === 0){
          transformedIngredients = <p> plz add ingredients</p>
    }
//   console.log(transformedIngredients)
//   console.log(Object.keys(props.ingredients))//["salad", "bacon", "cheese", "meat"]
//   console.log(props.ingredients['meat'])  // count of 'meat (2) and ...Array is [ , ]
   
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
             {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default  burger
