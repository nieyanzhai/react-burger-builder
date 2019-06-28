import * as actionsType from "./actionsType";
import axios from "../../axios";

export const addIngredient = ingredientType => {
  return {
    type: actionsType.ADD_INGREDIENTS,
    payload: ingredientType
  };
};

export const removeIngredient = ingredientType => {
  return {
    type: actionsType.REMOVE_INGREDIENTS,
    payload: ingredientType
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionsType.SET_INGREDIENTS,
    payload: ingredients
  };
};

export const fetchIngredientsError = err => {
  return {
    type: actionsType.FETCH_INGREDIENTS_ERROR
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(resp => dispatch(setIngredients(resp.data)))
      .catch(err => dispatch(fetchIngredientsError(err)));
  };
};
