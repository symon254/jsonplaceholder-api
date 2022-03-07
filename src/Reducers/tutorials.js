import {
    CREATE_TUTORIAL,
    RETRIEVE_TUTORIALS,
    RETRIEVE_TUTORIAL,
    UPDATE_TUTORIAL,
    DELETE_TUTORIAL,
    DELETE_ALL_TUTORIALS,
} from "../Actions/types";
const initialState = [];
function tutorialReducer(tutorials = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_TUTORIAL:
            return [...tutorials, payload];
        case RETRIEVE_TUTORIALS:
            return payload;
        case RETRIEVE_TUTORIAL:
            return payload;
        case UPDATE_TUTORIAL:
            return tutorials.map((tutorial) => {
                if (tutorial.id === payload.id) {
                    return {
                        ...tutorial,
                        ...payload,
                    };
                } else {
                    return tutorial;
                }
            });
        case DELETE_TUTORIAL:
            return tutorials.filter(({ id }) => id !== payload.id);
        case DELETE_ALL_TUTORIALS:
            return tutorials.filter(({ id }) => id !== payload.id);
        default:
            return tutorials;
    }
}
export default tutorialReducer;
