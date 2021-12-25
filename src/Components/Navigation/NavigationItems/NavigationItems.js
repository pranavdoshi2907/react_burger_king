import React from 'react'

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
const navigationItems =  (props) => (
  <ul className={classes.NavigationItems}>
       <NavigationItem link="/" exact>Burger</NavigationItem>
       { !props.isAuthenticated ? null :<NavigationItem link="/orders" >contact</NavigationItem> }
       { !props.isAuthenticated 
          ? <NavigationItem link="/auth" >Authentication </NavigationItem> 
          : <NavigationItem link="/logout" >logout  </NavigationItem>}
       
  </ul>
)

export default navigationItems;