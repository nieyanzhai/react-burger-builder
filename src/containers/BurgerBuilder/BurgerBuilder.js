import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import queryString from "query-string";
import { connect } from "react-redux";

import Auxiliary from "../../hoc/Auxiliary/Axiliary";
import Burger from "../../components/Burger/Burger";
import BuilderControls from "../../components/Burger/BuilderControls/BuilderControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios";
import * as actionType from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get("/ingredients.json")
    //   .then(resp => this.setState({ ingredients: resp.data }))
    //   .catch(err => this.setState({ error: true }));
  }

  updatePurchasable = newIngredients => {
    const ingredientsCount = Object.keys(newIngredients).reduce(
      (sum, key) => sum + newIngredients[key],
      0
    );

    return ingredientsCount > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const removeIngredientDisabledInfo = { ...this.props.ingredients };
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
    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          purchaseCanceld={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredients} />
          <BuilderControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            removeIngredientDisabledInfo={removeIngredientDisabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasable(this.props.ingredients)}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: type =>
      dispatch({ type: actionType.ADD_INGREDIENTS, ingredientType: type }),
    onIngredientRemoved: type =>
      dispatch({ type: actionType.REMOVE_INGREDIENTS, ingredientType: type })
  };
};

export default withErrorHandler(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(BurgerBuilder)
  ),
  axios
);
