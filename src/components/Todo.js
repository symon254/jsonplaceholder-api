import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../Actions/todos";
import TodoDataService from "../services/todoService";
const Todo = (props) => {
  const initialTodoState = {
    id: null,
    title: "",
    published: false
  };
  const [currentTodo, setCurrentTodo] = useState(initialTodoState);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const getTodo = id => {
    TodoDataService.get(id)
      .then(response => {
        setCurrentTodo(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getTodo(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };
  const updateStatus = status => {
    const data = {
      id: currentTodo.id,
      title: currentTodo.title,
      published: status
    };
    dispatch(updateTodo(currentTodo.id, data))
      .then(response => {
        console.log(response);
        setCurrentTodo({ ...currentTodo, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const updateContent = () => {
    dispatch(updateTodo(currentTodo.id, currentTodo))
      .then(response => {
        console.log(response);
        setMessage("The Todo was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const removeTodo = () => {
    dispatch(deleteTodo(currentTodo.id))
      .then(() => {
        props.history.push("/todos");
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentTodo ? (
        <div className="edit-form">
          <h4>Todo</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTodo.title}
                onChange={handleInputChange}
              />
            </div>
         
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTodo.published ? "Published" : "Pending"}
            </div>
          </form>
          {currentTodo.published ? (
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
          <button className="badge badge-danger mr-2" onClick={removeTodo}>
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
          <p>Please click on a Todo...</p>
        </div>
      )}
    </div>
  );
};
export default Todo;