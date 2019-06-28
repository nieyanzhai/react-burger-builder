import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import lazyComponentLoader from "./hoc/lazyLoader/lazyLoader";

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheck();
  }

  render() {
    const lazyCheckout = lazyComponentLoader(() =>
      import("./containers/Checkout/Checkout")
    );
    const lazyOrders = lazyComponentLoader(() =>
      import("./containers/Orders/Orders")
    );
    const lazyAuth = lazyComponentLoader(() =>
      import("./containers/Auth/Auth")
    );

    let routes = (
      <Switch>
        <Route path="/auth" component={lazyAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={lazyCheckout} />
          <Route path="/orders" component={lazyOrders} />
          <Route path="/auth" component={lazyAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheck: () => dispatch(actions.authCheck())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
