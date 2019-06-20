import React, { Component } from "react";
import { Route } from "react-router-dom";
import queryString from "query-string";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummay";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    let totalPrice = 0;
    const ingredients = {};

    const searchStringObj = queryString.parse(this.props.location.search);

    for (let key in searchStringObj) {
      if (key === "totalPrice") {
        totalPrice = (+searchStringObj[key]).toFixed(2);
      } else {
        ingredients[key] = +searchStringObj[key];
      }
    }

    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
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
          ingredients={this.state.ingredients}
          orderCanceled={this.orderCanceled}
          orderContinued={this.orderContinued}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
