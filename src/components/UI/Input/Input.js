import React from "react";

import classes from "./Input.css";

const input = props => {
  let inputElement = null;
  let classArr = [classes.InputElement];
  let validationError = null;

  if (props.invalid && props.shouldCheck && props.touched) {
    classArr.push(classes.Invalid);
    validationError = (
      <p className={classes.ValidationError}>
        PLease enter a valid {props.label}!
      </p>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classArr.join(" ")}
          {...props.elementConfig}
          value={props.elementValue}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classArr.join(" ")}
          {...props.elementConfig}
          value={props.elementValue}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classArr.join(" ")}
          value={props.elementValue}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classArr.join(" ")}
          {...props.elementConfig}
          value={props.elementValue}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
