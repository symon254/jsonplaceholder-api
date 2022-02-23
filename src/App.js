import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTutorial from "./components/AddTutorial";
import TutorialsList from "./components/TutorialsList";
function App() {
    return (
        //  <div>
        //    <nav className="navbar navbar-expand navbar-dark bg-dark">
        //      <a href="/tutorials" className="navbar-brand">
        //        bezKoder
        //      </a>
        //      <div className="navbar-nav mr-auto">
        //        <li className="nav-item">
        //          <Link to={"/tutorials"} className="nav-link">
        //            Tutorials
        //          </Link>
        //        </li>
        //        <li className="nav-item">
        //          <Link to={"/add"} className="nav-link">
        //            Add
        //          </Link>
        //        </li>
        //      </div>
        //    </nav>
        //    <div className="container mt-3">
        //       <Router>
        //         <Routes>
        //           <Route exact path={["/", "/tutorials"]} element={<TutorialsList />} />
        //           <Route exact path="/add" element={<AddTutorial />} />
        //           <Route path="/tutorials/:id" element={<Tutorial />} />
        //         </Routes>
        //       </Router>
        //   </div>
        // </div>
        <div>
            <AddTutorial />
            <TutorialsList />
        </div>
    );
}
export default App;
