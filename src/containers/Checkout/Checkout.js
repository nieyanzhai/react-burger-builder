import React, { Component } from "react";
import queryString from "query-string";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummay";

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 1,
      salad: 1,
      bacon: 1,
      cheese: 1
    }
  };

  componentDidMount() {
    const ingredients = queryString.parse(this.props.location.search);

    for (let key in ingredients) {
      ingredients[key] = +ingredients[key];
    }

    this.setState({ ingredients: ingredients });
  }

  orderCanceled = () => {
    this.props.history.goBack();
  };

  orderContinued = () => {
    this.props.history.push("/checkout/validation");
  };

  render() {
    return (
      <CheckoutSummary
        ingredients={this.state.ingredients}
        orderCanceled={this.orderCanceled}
        orderContinued={this.orderContinued}
      />
    );
  }
}

export default Checkout;
