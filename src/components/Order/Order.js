import React from "react";

import classes from "./Order.css";

const order = props => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientsOutput = ingredients.map(ig => (
    <span
      key={ig.name}
      style={{
        display: "inline-block",
        padding: "0.2rem",
        margin: "0 0.5rem",
        border: "1px solid #eee",
        boxShadow: "0 2px 3px #ccc",
        background: "#ddd"
      }}
    >
      {ig.name} ({ig.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price(usd): <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
