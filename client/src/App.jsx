import React from "react";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
// import { rootRoutes } from "./rootRoute";

import { BrowserRouter as Router, Route } from "react-router-dom";
// import Profile from "./components/Profile/Profile";
export default function App() {
  return (
    <div>
      <Router>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route path="/dashboard">
          <Home />
        </Route>
      </Router>
    </div>
  );
}
