import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ShowSideDrawer from "../SideDrawer/ShowSideDrawer/ShowSideDrawer";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <ShowSideDrawer clicked={props.showSideDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <div className={classes.DesktopOnly}>
      <NavigationItems />
    </div>
  </header>
);

export default toolbar;
