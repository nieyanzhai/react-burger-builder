import * as actionsType from "./actionsType";
import axios from "../../axios";

//Check-out
export const checkoutInit = () => {
  return {
    type: actionsType.CHECKOUT_INIT
  };
};

export const checkoutStart = () => {
  return { type: actionsType.CHECKOUT_START };
};

export const checkoutSuccess = (orderID, orderData) => {
  return {
    type: actionsType.CHECKOUT_SUCCESS,
    payload: { id: orderID, data: orderData }
  };
};

export const checkoutFail = err => {
  return {
    type: actionsType.CHECKOUT_FAIL
  };
};

export const checkoutAsync = (order, token) => {
  return dispatch => {
    dispatch(checkoutStart());
    axios
      .post("/orders.json?auth=" + token, order)
      .then(resp => dispatch(checkoutSuccess(resp.data.name, order)))
      .catch(err => dispatch(checkoutFail(err)))
      .finally(() => {});
  };
};

//Fetch-orders
export const fetchOrdersStart = () => {
  return {
    type: actionsType.FETCH_ORDERS_START
  };
};

export const fetchOrdersSuccess = fetchedOrders => {
  return {
    type: actionsType.FETCH_ORDERS_SUCCESS,
    payload: fetchedOrders
  };
};

export const fetchOrderFail = err => {
  return {
    type: actionsType.FETCH_ORDERS_FAIL
  };
};

export const fetchOrdersAsync = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then(resp => {
        const fetchedOrders = [];
        for (let order in resp.data) {
          fetchedOrders.push({
            ...resp.data[order],
            id: order
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrderFail(err));
      });
  };
};
