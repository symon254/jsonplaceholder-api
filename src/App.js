import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import AddTodo from "./components/AddTodo";
import TodosList from "./components/TodosList";
import Todo from './components/Todo';

function App() {
  return (
    <Router>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/todos" className="navbar-brand">
        bezKoder
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/todos"} className="nav-link">
            Todos
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/add"} className="nav-link">
            Add
          </Link>
        </li>
      </div>
    </nav>
    <div className="container mt-3">
      <Routes>
        <Route exact path={["/", "/todos"]} component={TodosList} />
        <Route exact path="/add" component={AddTodo} />
        <Route path="/todos/:id" component={Todo} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
