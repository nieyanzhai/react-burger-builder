import { connect } from "react-redux";

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
        <Toolbar
          showSideDrawer={this.showSideDrawer}
          isAuth={this.props.isAuth}
        />
        <SideDrawer
          show={this.state.showSideDrawer}
          hideSideDrawer={this.hideSideDrawer}
          isAuth={this.props.isAuth}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
