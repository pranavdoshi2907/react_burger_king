import React, { Component } from 'react'

import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../Components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { checkValidity } from '../../shared/utility'

export class Auth extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             controls : {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: ' email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail : true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: ' password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength : 6
                    },
                    valid: false,
                    touched: false
                },
                isSignup : true 
             }
        }
    }

    componentDidMount() {
            if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
                this.props.onSetAuthRedirectPath()
            }
    }

    switchAuthHandler = () => {
        this.setState(prevState =>{
            return {
                isSignup : !prevState.isSignup
            }
        })
    }

    // checkValidity = (value, rules) => {
    //     // move in utility
    // }

    inputChangedHandler = ( event, ControlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [ControlName] : {
                ...this.state.controls[ControlName],
                value : event.target.value,
                valid : checkValidity(event.target.value,this.state.controls[ControlName].validation),
                touched : true
            }
        };
        
        this.setState({
            controls : updatedControls
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }
    
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
         let form = formElementsArray.map(formElement => (
             <Input  
             key={formElement.id}
             elementType={formElement.config.elementType}
             elementConfig={formElement.config.elementConfig}
             value={formElement.config.value}
             invalid={!formElement.config.valid}
             shouldValidate={formElement.config.validation}
             touched={formElement.config.touched}
             changed={(event) => this.inputChangedHandler(event, formElement.id)}
             />
         ))

         if (this.props.loading) {
             form = <Spinner />            
         }

         let errorMessage = null
         if (this.props.error) {
             errorMessage = (
             <p>{this.props.error.message}</p>
             )
         }

         let authRedirect = null
         if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
         }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                 <form onSubmit={this.submitHandler}>
                     {form}
                     <Button btnType="Success">Submit</Button>
                 </form>
                     <Button btnType="Danger" clicked={this.switchAuthHandler}>
                         {this.state.isSignup ? 'Signin' : 'signup'}
                     </Button>
                 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error ,
        isAuthenticated : state.auth.token !== null,
        buildingBurger : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    } 
}        

const mapDispatchToProps = dispatch => {
    return {
         onAuth : (email, password, isSignUp ) => dispatch(actions.auth(email, password, isSignUp)),
         onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
        }
}       

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
