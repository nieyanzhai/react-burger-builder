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
        label: "Name"
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "street",
          placeholder: "Street"
        },
        value: "",
        label: "Street"
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "zipcode",
          placeholder: "Zip Code"
        },
        value: "",
        label: "Zip Code"
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "country",
          placeholder: "Your Country"
        },
        value: "",
        label: "Country"
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          name: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        label: "Email"
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
        label: "Delivery"
      }
    },
    loading: false
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
      price: this.props.totalPrice,
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

  inputChangeHandler = (event, elementID) => {
    const updatedFormElements = { ...this.state.formElements };
    const updatedFormElement = { ...updatedFormElements[elementID] };

    updatedFormElement.value = event.target.value;
    updatedFormElements[elementID] = updatedFormElement;

    this.setState({ formElements: updatedFormElements });
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
        <label style={{ textAlign: "center", margin: "1.5rem auto" }}>
          Enter your contact data
        </label>
        {formElementArr.map(element => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            elementValue={element.config.value}
            label={element.config.label}
            changed={event => this.inputChangeHandler(event, element.id)}
          />
        ))}
        <Button btnType="Success">Continue</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return <div className={classes.ContactData}>{form}</div>;
  }
}

export default ContactData;
