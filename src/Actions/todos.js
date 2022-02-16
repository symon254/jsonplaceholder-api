import {
    CREATE_TODO,
    RETRIEVE_TODOS,
    UPDATE_TODO,
    DELETE_TODO,
  } from "./types";
  import TodoDataService from "../services/todoService";
  export const createTodo = (todos) => async (dispatch) => {
    try {
      const res = await TodoDataService.create({ todos });
      dispatch({
        type: CREATE_TODO,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveTodos = () => async (dispatch) => {
    try {
      const res = await TodoDataService.getAll();
      dispatch({
        type: RETRIEVE_TODOS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const updateTodo = (id, data) => async (dispatch) => {
    try {
      const res = await TodoDataService.update(id, data);
      dispatch({
        type: UPDATE_TODO,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteTodo = (id) => async (dispatch) => {
    try {
      await TodoDataService.remove(id);
      dispatch({
        type: DELETE_TODO,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const findTodosByTitle = (title) => async (dispatch) => {
    try {
      const res = await TodoDataService.findByTitle(title);
      dispatch({
        type: RETRIEVE_TODOS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };