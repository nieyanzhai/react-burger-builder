import React from "react";
import classes from "./BuilderControls.css";
import BuilderControl from "./BuilderControl/BuilderControl";

const controls = [
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" }
];

const builderControls = props => (
  <div className={classes.BuilderControls}>
    <p>
      Total Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuilderControl
        key={control.label}
        label={control.label}
        addIngredient={() => props.addIngredient(control.type)}
        removeIngredient={() => props.removeIngredient(control.type)}
        removeIngredientDisabledInfo={
          props.removeIngredientDisabledInfo[control.type]
        }
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.purchasing}
    >
      Order Now
    </button>
  </div>
);

export default builderControls;
