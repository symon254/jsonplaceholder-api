import {
    CREATE_TUTORIAL,
    RETRIEVE_TUTORIALS,
    // RETRIEVE_TUTORIAL,
    UPDATE_TUTORIAL,
    DELETE_TUTORIAL,
    DELETE_ALL_TUTORIALS,
} from "./types";
import TutorialDataService from "../services/TutorialService";
import http from "../Utils/api";

export const createTutorial = (title, description) => async (dispatch) => {
    try {
        // http.post("/tutorials", data);
        const res = await http.post("/tutorials", { title, description });
        dispatch({
            type: CREATE_TUTORIAL,
            payload: res.data,
        });
        console.log(res);
        //  return Promise.resolve(res.data);
    } catch (err) {
        //  return Promise.reject(err);
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
        //  return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        //  return Promise.reject(err);
    }
};
export const retrieveTutorials = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getAll();
        dispatch({
            type: RETRIEVE_TUTORIALS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
// export const retrieveTutorial = (id) => async (dispatch) => {
//     try {
//         const res = await http.get(`/tutorials/${id}`);
//         dispatch({
//             type: RETRIEVE_TUTORIAL,
//             payload: res.data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };
// export const updateTutorial = (id, data) => async (dispatch) => {
//     try {
//         const res = await TutorialDataService.update(id, data);
//         dispatch({
//             type: UPDATE_TUTORIAL,
//             payload: data,
//         });
//         return Promise.resolve(res.data);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };
export const deleteTutorial = (id) => async (dispatch) => {
    try {
        await TutorialDataService.remove(id);
        dispatch({
            type: DELETE_TUTORIAL,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};
export const deleteAllTutorials = () => async (dispatch) => {
    try {
        const res = await http.delete("/tutorials");
        dispatch({
            type: DELETE_ALL_TUTORIALS,
            payload: res.data,
        });
        console.log(res);
        //  return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        //  return Promise.reject(err);
    }
};
export const findTutorialsByTitle = (title) => async (dispatch) => {
    try {
        const res = await TutorialDataService.findByTitle(title);
        dispatch({
            type: RETRIEVE_TUTORIALS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
