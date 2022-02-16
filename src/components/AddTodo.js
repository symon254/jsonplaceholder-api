import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../Actions/todos";
const AddTodo = () => {
  const initialTodoState = {
    id: null,
    todos: "",
    description: "",
    published: false
  };
  const [todo, setTodo] = useState(initialTodoState);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = event => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };
  const saveTodo = () => {
    const { todos } = todo;
    dispatch(createTodo(todos))
      .then(data => {
        setTodo({
          id: data.id,
          todos: data.todos,
          published: data.published
        });
        setSubmitted(true);
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const newTodo = () => {
    setTodo(initialTodoState);
    setSubmitted(false);
  };
  return (
   <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTodo}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="todos">Todos</label>
            <input
              type="text"
              className="form-control"
              id="todos"
              required
              value={todo.todos}
              onChange={handleInputChange}
              name="todos"
            />
          </div>
         
          <button onClick={saveTodo} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default AddTodo;