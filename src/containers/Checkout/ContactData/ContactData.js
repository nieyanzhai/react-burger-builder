import React, { Component } from "react";
import axios from "../../../axios";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.css";

class ContactData extends Component {
  state = {
    formElements: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "name",
          placeholder: "Your Name"
        },
        value: "",
        label: "Name",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "street",
          placeholder: "Street"
        },
        value: "",
        label: "Street",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "zipcode",
          placeholder: "Zip Code"
        },
        value: "",
        label: "Zip Code",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "country",
          placeholder: "Your Country"
        },
        value: "",
        label: "Country",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          name: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        label: "Email",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      delivery: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest"
            },
            {
              value: "cheapest",
              displayValue: "Cheapest"
            }
          ]
        },
        value: "fastest",
        label: "Delivery",
        validation: {},
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  };

  orderSubmitHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });

    const orderFormData = {};
    for (let formElement in this.state.formElements) {
      orderFormData[formElement] = this.state.formElements[formElement].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.toFixed(2),
      contact: orderFormData
    };

    axios
      .post("/orders.json", order)
      .then(resp => {
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      })
      .finally(() => {
        this.props.history.push("/");
      });
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangeHandler = (event, elementID) => {
    const updatedFormElements = { ...this.state.formElements };
    const updatedFormElement = { ...updatedFormElements[elementID] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedFormElements[elementID] = updatedFormElement;

    let formIsValid = true;
    for (let element in updatedFormElements) {
      formIsValid = updatedFormElements[element].valid && formIsValid;
    }

    this.setState({
      formElements: updatedFormElements,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElementArr = [];
    for (let element in this.state.formElements) {
      formElementArr.push({
        id: element,
        config: this.state.formElements[element]
      });
    }

    let form = (
      <form className={classes.Form} onSubmit={this.orderSubmitHandler}>
        <label
          style={{
            textAlign: "center",
            margin: "1.5rem auto"
          }}
        >
          Enter your contact data
        </label>
        {formElementArr.map(element => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            elementValue={element.config.value}
            label={element.config.label}
            invalid={!element.config.valid}
            shouldCheck={element.config.validation}
            touched={element.config.touched}
            changed={event => this.inputChangeHandler(event, element.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Continue
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return <div className={classes.ContactData}>{form}</div>;
  }
}

export default ContactData;
