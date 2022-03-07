import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    updateTutorial,
    deleteTutorial,
    retrieveTutorial,
} from "../Actions/tutorials";
//import http from "../Utils/api";

const Tutorial = (props) => {
    const { id } = useParams();

    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        published: false,
    };
    const [currentTutorial, setCurrentTutorial] =
        useState(initialTutorialState);
    const [message, setMessage] = useState("");
    const tutorials = useSelector((state) => state.tutorials);

    const dispatch = useDispatch();

    // const getTutorial = (id) => async () => {
    //     http.get(`/tutorials/${id}`)
    //         .then((res) => {
    //             setCurrentTutorial(res.data);
    //             console.log(res.data);
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // };
    // useEffect(() => {
    //     dispatch(getTutorial(id));
    //     console.log(id);
    // }, [dispatch, id]);

    useEffect(() => {
        dispatch(retrieveTutorial(id));
        console.log(id);
    }, [dispatch, id]);
    useEffect(() => {
        if (tutorials) {
            setCurrentTutorial({ ...tutorials });
        }
    }, [tutorials]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentTutorial({ ...currentTutorial, [name]: value });
    };

    const updateStatus = (status) => {
        const data = {
            id: currentTutorial.id,
            title: currentTutorial.title,
            description: currentTutorial.description,
            published: status,
        };
        dispatch(updateTutorial(currentTutorial.id, data))
            .then((response) => {
                setCurrentTutorial({ ...currentTutorial, published: status });
                console.log(response);
                // setMessage("The status was updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const updateContent = () => {
        dispatch(updateTutorial(currentTutorial.id, currentTutorial))
            .then((response) => {
                console.log(response);
                setMessage("The tutorial was updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const removeTutorial = () => {
        dispatch(deleteTutorial(currentTutorial.id))
            .then(() => {
                props.history.push("/tutorials");
            })
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <div>
            {currentTutorial ? (
                <div className="edit-form">
                    <h4>Tutorial</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentTutorial.title || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentTutorial.description || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentTutorial.published
                                ? "Published"
                                : "Pending"}
                        </div>
                    </form>
                    {currentTutorial.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(true)}
                        >
                            Publish
                        </button>
                    )}
                    <button
                        className="badge badge-danger mr-2"
                        onClick={removeTutorial}
                    >
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Tutorial...</p>
                </div>
            )}
        </div>
    );
};
export default Tutorial;
