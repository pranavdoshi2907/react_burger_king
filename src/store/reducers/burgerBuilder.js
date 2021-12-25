import *  as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const intialState = {
    ingredients : null,
    totalPrice : 18,
    error : false,
    building : false , 
    // authRedirectPath : '/'  
}

const INGREDIENT_PRICES = {
    salad : 1, 
     bacon : 3,
     cheese : 3,
     meat : 4
   }

   const addIngredients = (state, action ) => {
        const updatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1 }
        const updatedIngredients = updateObject(state.ingredients,  updatedIngredient)
        const updatedState = {
            ingredients : updatedIngredients,
            totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building : true
        }
        return updateObject(state,updatedState)
   }

   const removeIngredients = (state, action ) => {
    const updatedIng = { [action.ingredientName] : state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients,  updatedIng)
    const updatedSt = {
        ingredients : updatedIngs,
        totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building : true
    }
    return updateObject(state,updatedSt)

   }

   const setIngredients = (state, action) => {
    return updateObject(state,{ ingredients : {
        salad : action.ingredients.salad,
        bacon : action.ingredients.bacon,
        cheese : action.ingredients.cheese,
        meat : action.ingredients.meat
       },
       totalPrice : 18,
       error : false,
       building : false
    } )
   }

   const fetchIngredientsFailed = (state, action) => {
        return updateObject(state,{error : true})
   }

const reducer =  (state = intialState,action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS :  return addIngredients(state,action)
            // return {
            //     ...state,
            //     ingredients : {
            //         ...state.ingredients,
            //         [action.ingredientName] : state.ingredients[action.ingredientName] + 1
            //     },
            //     totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            // }
        case actionTypes.REMOVE_INGREDIENTS : return removeIngredients(state,action)
           
            // return {
            //     ...state,
            //     ingredients : {
            //         ...state.ingredients,
            //         [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            //     },
            //     totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            // }
            
        case actionTypes.SET_INGREDIENTS : return setIngredients(state, action)

                 //    return {
        //        ...state,
        //        ingredients : {
        //         salad : action.ingredients.salad,
        //         bacon : action.ingredients.bacon,
        //         cheese : action.ingredients.cheese,
        //         meat : action.ingredients.meat
        //        },
        //        totalPrice : 18,
        //        error : false
        //    }

        case actionTypes.FETCH_INGREDIENTS_FAILED : return fetchIngredientsFailed(state, action)

            // return {
            //     ...state,
            //     error : true 
            // }   

        default:
            return state;
    }
}
export default reducer;