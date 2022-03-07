import {
    CREATE_TUTORIAL,
    RETRIEVE_TUTORIALS,
    RETRIEVE_TUTORIAL,
    UPDATE_TUTORIAL,
    DELETE_TUTORIAL,
    DELETE_ALL_TUTORIALS,
} from "./types";
import http from "../Utils/api";
export const createTutorial = (title, description) => async (dispatch) => {
    try {
        const res = await http.post("/tutorials", { title, description });
        dispatch({
            type: CREATE_TUTORIAL,
            payload: res.data,
        });
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};
export const updateTutorial = (id, data) => async (dispatch) => {
    try {
        const res = await http.put(`/tutorials/${id}`, data);
        dispatch({
            type: UPDATE_TUTORIAL,
            payload: res.data,
        });
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};
export const retrieveTutorials = () => async (dispatch) => {
    try {
        const res = await http.get("/tutorials");
        dispatch({
            type: RETRIEVE_TUTORIALS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
export const retrieveTutorial = (id, data) => async (dispatch) => {
    try {
        const res = await http.get(`/tutorials/${id}`, data);
        dispatch({
            type: RETRIEVE_TUTORIAL,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteTutorial = (id) => async (dispatch) => {
    try {
        await http.delete(`/tutorials/${id}`);
        dispatch({
            type: DELETE_TUTORIAL,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};
export const deleteAllTutorial = (id) => async (dispatch) => {
    try {
        await http.delete(`/tutorials/${id}`);
        dispatch({
            type: DELETE_ALL_TUTORIALS,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const findTutorialsByTitle = (title) => async (dispatch) => {
    try {
        const res = await http.get(`/tutorials?title=${title}`);
        dispatch({
            type: RETRIEVE_TUTORIALS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
