import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import classes from "./Toolbar.css";

const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggleClicked} />
        <Logo />
        <nav className={classes.DesktopOnly}><NavigationItems /></nav>
    </div>
);

export default toolbar;