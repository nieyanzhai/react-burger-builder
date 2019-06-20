import React, { Component } from "react";
import axios from "../../axios";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: null,
    error: false
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(resp => {
        const fetchedOrders = [];

        for (let order in resp.data) {
          fetchedOrders.push({
            ...resp.data[order],
            id: order
          });
        }

        this.setState({ orders: fetchedOrders });
      })
      .catch(err => {
        console.log("Error: " + err.message);
        this.setState({ error: true });
      });
  }

  render() {
    let orders = this.state.error ? (
      <p style={{ textAlign: "center", color: "red" }}>
        Something went wrong!!!
      </p>
    ) : (
      <Spinner />
    );
    if (this.state.orders) {
      orders = this.state.orders.map(order => (
        <Order
          ingredients={order.ingredients}
          price={order.price}
          key={order.id}
        />
      ));
    }

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
