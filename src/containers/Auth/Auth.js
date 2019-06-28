import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    formElements: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          name: "email",
          placeholder: "email address"
        },
        value: "",
        label: "email",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          name: "password",
          placeholder: "password"
        },
        value: "",
        label: "password",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: false
  };

  componentDidMount() {
    if (!this.props.buildingBurder && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }

  inputChangeHandler = (event, elementID) => {
    const updatedFormElements = updateObject(this.state.formElements, {
      [elementID]: updateObject(this.state.formElements[elementID], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.formElements[elementID].validation
        ),
        touched: true
      })
    });

    this.setState({
      formElements: updatedFormElements
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();

    this.props.onAuth(
      this.state.formElements.email.value,
      this.state.formElements.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formElementArr = [];
    for (let element in this.state.formElements) {
      formElementArr.push({
        id: element,
        config: this.state.formElements[element]
      });
    }

    let form = <Spinner />;
    if (!this.props.loading) {
      let errorMessage = null;
      if (this.props.error) {
        errorMessage = (
          <p style={{ color: "red" }}>{this.props.error.message}</p>
        );
      }

      let authRedirect = null;
      if (this.props.isAuth) {
        authRedirect = <Redirect to={this.props.authRedirectPath} />;
      }

      form = (
        <form className={classes.Form} onSubmit={this.onSubmitHandler}>
          {authRedirect}
          {errorMessage}
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
          <div>
            <Button
              btnType="Success"
              clicked={() => this.setState({ isSignUp: false })}
            >
              Sign In
            </Button>
            <Button
              btnType="Danger"
              clicked={() => this.setState({ isSignUp: true })}
            >
              Sign Up
            </Button>
          </div>
        </form>
      );
    }

    return <div className={classes.Auth}>{form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurder: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.authAsync(email, password, isSignUp)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
