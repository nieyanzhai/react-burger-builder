import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
// import queryString from "query-string";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummay";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  orderCanceled = () => {
    this.props.history.goBack();
  };

  orderContinued = () => {
    this.props.history.push("/checkout/contact-data");
  };

  render() {
    return this.props.ingredients ? (
      <div>
        {this.props.checkouted ? <Redirect to="/" /> : null}
        <CheckoutSummary
          ingredients={this.props.ingredients}
          orderCanceled={this.orderCanceled}
          orderContinued={this.orderContinued}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />{" "}
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    checkouted: state.order.checkouted
  };
};

export default connect(mapStateToProps)(Checkout);
