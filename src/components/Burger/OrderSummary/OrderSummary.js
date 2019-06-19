import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Axiliary";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(key => (
    <li key={key}>
      <span style={{ textTransform: "capitalize" }}>{key}</span>:
      {props.ingredients[key]}
    </li>
  ));

  return (
    <Auxiliary>
      <h2>Your Order</h2>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total Price:{props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceld}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        Continue
      </Button>
    </Auxiliary>
  );
};

export default orderSummary;
