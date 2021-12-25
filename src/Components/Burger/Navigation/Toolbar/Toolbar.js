import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../../Logo/Logo';
import NavigationItems from '../../../Navigation/NavigationItems/NavigationItems';
import DrawToggler from '../../../Navigation/SideDrawer/DrawToggler/DrawToggler';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawToggler clicked={props.drawerTogglerClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />            
        </nav>
    </header>
);

export default toolbar;