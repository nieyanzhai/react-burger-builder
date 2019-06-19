import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Axiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  hideSideDrawer = () => {
    this.setState({ showSideDrawer: false });
  };

  showSideDrawer = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <Auxiliary>
        <Toolbar showSideDrawer={this.showSideDrawer} />
        <SideDrawer
          show={this.state.showSideDrawer}
          hideSideDrawer={this.hideSideDrawer}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
