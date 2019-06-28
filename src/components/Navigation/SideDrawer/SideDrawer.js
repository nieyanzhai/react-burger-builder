import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Axiliary";

const sideDrawer = props => {
  let attachedClass = [classes.SideDrawer, classes.Hide];

  if (props.show) {
    attachedClass = [classes.SideDrawer, classes.Show];
  }

  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.hideSideDrawer} />
      <div className={attachedClass.join(" ")} onClick={props.hideSideDrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <NavigationItems isAuth={props.isAuth} />
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
