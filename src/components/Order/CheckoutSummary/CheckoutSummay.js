import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../../components/UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope it tasts you well</h1>
      <Burger ingredients={props.ingredients} />
      <Button btnType="Danger" clicked={props.orderCanceled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.orderContinued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
