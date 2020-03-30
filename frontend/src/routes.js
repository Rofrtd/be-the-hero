import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewCase from "./pages/NewCase";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/Profile" component={Profile} />
        <Route path="/cases/new" component={NewCase} />
      </Switch>
    </BrowserRouter>
  );
}
