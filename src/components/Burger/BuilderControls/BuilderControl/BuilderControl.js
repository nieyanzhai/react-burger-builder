import React from "react";
import classes from "./BuilderControl.css";

const builderControl = props => (
  <div className={classes.BuilderControl}>
    <label>{props.label}</label>
    <div>
      <button
        className={classes.Less}
        onClick={props.removeIngredient}
        disabled={props.removeIngredientDisabledInfo}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.addIngredient}>
        More
      </button>
    </div>
  </div>
);

export default builderControl;
