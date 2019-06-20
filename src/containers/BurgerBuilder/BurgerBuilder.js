import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import Auxiliary from "../../hoc/Auxiliary/Axiliary";
import Burger from "../../components/Burger/Burger";
import BuilderControls from "../../components/Burger/BuilderControls/BuilderControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios";

const INGREDIENT_PRICE = {
  meat: 1.5,
  salad: 0.4,
  cheese: 1.2,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(resp => this.setState({ ingredients: resp.data }))
      .catch(err => this.setState({ error: true }));
  }

  updatePurchasable = newIngredients => {
    const ingredientsCount = Object.keys(newIngredients).reduce(
      (sum, key) => sum + newIngredients[key],
      0
    );

    this.setState({ purchasable: ingredientsCount > 0 });
  };

  addIngredientHandler = type => {
    const newCount = this.state.ingredients[type] + 1;

    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newCount;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

    this.setState({ ingredients: newIngredients, totalPrice: newPrice });

    this.updatePurchasable(newIngredients);
  };

  removeIngredientHandler = type => {
    const newCount = this.state.ingredients[type] - 1;

    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newCount;

    const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

    this.setState({ ingredients: newIngredients, totalPrice: newPrice });

    this.updatePurchasable(newIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    let searchString = { ...this.state.ingredients };
    searchString.totalPrice = this.state.totalPrice;

    searchString = "?" + queryString.stringify(searchString);

    this.props.history.push({
      pathname: "/checkout",
      search: searchString
    });
  };

  render() {
    const removeIngredientDisabledInfo = { ...this.state.ingredients };
    for (let key in removeIngredientDisabledInfo) {
      removeIngredientDisabledInfo[key] =
        removeIngredientDisabledInfo[key] === 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p style={{ textAlign: "center", color: "red" }}>
        Error: loading ingredients failed!!!!
      </p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCanceld={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuilderControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            removeIngredientDisabledInfo={removeIngredientDisabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.purchaseHandler}
          />
        </Auxiliary>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          clicked={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(withRouter(BurgerBuilder), axios);
