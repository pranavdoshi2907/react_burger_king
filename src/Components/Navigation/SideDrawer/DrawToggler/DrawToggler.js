import React from 'react'

import classes from './DrawToggler.css'

const drawToggler = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default drawToggler