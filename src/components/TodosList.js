import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  retrieveTodos,
  findTodosByTitle,
} from "../Actions/todos";
const TodosList = () => {
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveTodos());
  }, []);
  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const refreshData = () => {
    setCurrentTodo(null);
    setCurrentIndex(-1);
  };
  const setActiveTodo = (todo, index) => {
    setCurrentTodo(todo);
    setCurrentIndex(index);
  };
  const findByTitle = () => {
    refreshData();
    dispatch(findTodosByTitle(searchTitle));
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
        <h4>Todos List</h4>
        <ul className="list-group">
          {todos &&
            todos.map((todo, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTodo(todo, index)}
                key={index}
              >
                {todo.title}
              </li>
            ))}
        </ul>
       
      </div>
      <div className="col-md-6">
        {currentTodo ? (
          <div>
            <h4>Todo</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTodo.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTodo.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTodo.published ? "Published" : "Pending"}
            </div>
            <Link
              to={"/todos/" + currentTodo.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Todo...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default TodosList;