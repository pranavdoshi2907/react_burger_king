import React, { Component } from 'react'

// import Aux from '../hoc/Aux';
import classes from './Layout.css'
import Toolbar from '../../Components/Burger/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';

class Layout extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             showSideDrawer : false
        }
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer : false
        })
    }

    sideDrawerTogglerClicked = () => {
        this.setState( ( prevState ) => {
           return {
                   showSideDrawer : !prevState.showSideDrawer
                }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerTogglerClicked={this.sideDrawerTogglerClicked} />
                <SideDrawer
                 isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);