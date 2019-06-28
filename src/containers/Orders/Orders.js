import React, { Component } from "react";
import axios from "../../axios";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.fetching) {
      orders = this.props.orders.map(order => (
        <Order
          ingredients={order.ingredients}
          price={order.price}
          key={order.id}
        />
      ));
    }

    if (this.props.fetchError) {
      orders = (
        <p style={{ textAlign: "center", color: "red" }}>
          Something went wrong!!!
        </p>
      );
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.order.fetching,
    fetchError: state.order.fetchError,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrdersAsync(token, userId))
  };
};

export default withErrorHandler(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Orders),
  axios
);
