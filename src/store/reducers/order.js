import * as actionsType from "../actions/actionsType";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  checkouting: false,
  checkouted: false,
  fetching: false,
  fetchError: false
};

const checkoutInit = (state, action) => {
  return updateObject(state, {
    checkouting: false,
    checkouted: false
  });
};

const checkoutStart = (state, action) => {
  return updateObject(state, { checkouting: true });
};

const checkoutSuccess = (state, action) => {
  const newPayload = updateObject(action.payload, {
    data: {
      ...action.payload.data
    }
  });
  return updateObject(state, {
    checkouting: false,
    checkouted: true,
    orders: state.orders.concat(newPayload)
  });
};

const checkoutFail = (state, action) => {
  return updateObject(state, { checkouting: false });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { fetching: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    fetching: false,
    orders: action.payload
  });
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, { fetching: false, fetchError: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.CHECKOUT_INIT:
      return checkoutInit(state, action);

    case actionsType.CHECKOUT_START:
      return checkoutStart(state, action);

    case actionsType.CHECKOUT_SUCCESS:
      return checkoutSuccess(state, action);

    case actionsType.CHECKOUT_FAIL:
      return checkoutFail(state, action);

    case actionsType.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    case actionsType.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionsType.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);

    default:
      return state;
  }
};

export default reducer;
