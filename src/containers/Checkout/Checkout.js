import React, { Component } from "react";
import { Route } from "react-router-dom";
// import queryString from "query-string";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummay";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  orderCanceled = () => {
    this.props.history.goBack();
  };

  orderContinued = () => {
    this.props.history.push("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          orderCanceled={this.orderCanceled}
          orderContinued={this.orderContinued}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.props.ingredients}
              totalPrice={this.props.totalPrice}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);
