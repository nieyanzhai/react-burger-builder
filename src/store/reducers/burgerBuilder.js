import * as actionsType from "../actions/actionsType";
import { updateObject } from "../../shared/utility";
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICE = {
  meat: 1.5,
  salad: 0.4,
  cheese: 1.2,
  bacon: 0.7
};

const addIngredients = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.payload]: state.ingredients[action.payload] + 1
  });
  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload],
    building: true
  });
};

const removeIngredients = (state, action) => {
  const updatedIngs = updateObject(state.ingredients, {
    [action.payload]: state.ingredients[action.payload] - 1
  });
  return updateObject(state, {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload],
    building: true
  });
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.payload,
    error: false,
    totalPrice: 4,
    building: false
  });
};

const fetchIngredientsError = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.ADD_INGREDIENTS:
      return addIngredients(state, action);

    case actionsType.REMOVE_INGREDIENTS:
      return removeIngredients(state, action);

    case actionsType.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionsType.FETCH_INGREDIENTS_ERROR:
      return fetchIngredientsError(state, action);

    default:
      return state;
  }
};

export default reducer;
