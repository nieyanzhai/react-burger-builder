import React from "react";
import classes from "./ShowSideDrawer.css";

const showSideDrawer = props => (
  <div onClick={props.clicked} className={classes.ShowSideDrawer}>
    <div />
    <div />
    <div />
  </div>
);

export default showSideDrawer;
