import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import Layout from './Container/Layout/Layout';
import CheckOut from './Container/CheckOut/CheckOut';
import Orders from './Container/Orders/Orders';
import Auth from './Container/Auth/Auth';
import Logout from './Container/Auth/Logout/Logout';
import * as actions from './store/actions/index';

// const LazyAuth = lazy(() => import('./Container/Auth/Auth'))
// const LazyCheckOut = lazy(() => import('./Container/CheckOut/CheckOut'))
// const LazyOrders = lazy(() => import('./Container/Orders/Orders'))
// const LazyLogout = lazy(() => import('./Container/Auth/Logout/Logout'))
//not working

class App extends Component {

  // constructor(props) {
  //   super(props)
  
  //   this.state = {
  //      show : true
  //   }
  // } //1

  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({
  //       show : false
  //     })
  //   },5000)
  // } //1

  componentDidMount(){
    this.props.onTryAutoSignup(); 
  }
  
  render() {
    let routes = (
      <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to='/' /> 
      </Switch>
         );
    if (this.props.isAuthenticated) {
      routes = (
      <Switch>
        <Route path="/checkout" component={CheckOut} />
        <Route path="/orders" component={Orders} />
        <Route path='/logout' component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' /> 
      </Switch>
      )
      
    }
    return (
      <div className="App">
         <Layout>
              {/* {this.state.show ? <BurgerBuilder /> : null} */}{/* //1 */}
              {/* <BurgerBuilder />
              <CheckOut /> */}
          {routes}
         </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));