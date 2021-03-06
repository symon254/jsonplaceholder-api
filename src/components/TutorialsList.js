import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    retrieveTutorials,
    findTutorialsByTitle,
    deleteTutorial,
    deleteAllTutorial,
} from "../Actions/tutorials";

import { Link } from "react-router-dom";

const TutorialsList = (props) => {
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const tutorials = useSelector((state) => state.tutorials);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(retrieveTutorials());
    }, [dispatch]);

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };
    const refreshData = () => {
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    };
    const setActiveTutorial = (tutorial, index) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
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
    const removeAllTutorials = () => {
        if (window.confirm("Are you sure?")) {
            let dataItems = tutorials.map((data) => data.id);
            for (let i = 0; i < dataItems.length; i++) {
                const element = dataItems[i];
                dispatch(deleteAllTutorial(element));
                console.log(element);
            }
        }
    };
    const findByTitle = () => {
        refreshData();
        dispatch(findTutorialsByTitle(searchTitle));
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Tutorials List</h4>
                <ul className="list-group">
                    {tutorials &&
                        tutorials.map((tutorial, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() =>
                                    setActiveTutorial(tutorial, index)
                                }
                                key={index}
                            >
                                {tutorial.title}
                                <h2
                                    style={{
                                        color: "red",
                                        float: "right",
                                        cursor: "pointer",
                                    }}
                                    onClick={removeTutorial}
                                >
                                    x
                                </h2>
                            </li>
                        ))}
                </ul>
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllTutorials}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentTutorial ? (
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentTutorial.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentTutorial.description}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentTutorial.published
                                ? "Published"
                                : "Pending"}
                        </div>
                        <p>
                            <Link
                                to={`/tutorials/${currentTutorial.id}`}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </p>

                        {/* <Link
                            to={"/tutorials/" + currentTutorial.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link> */}
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default TutorialsList;
