import React from "react";
import { Route, Switch } from "react-router";
import UserList from "./components/UserList";
import "./App.css";
import Add from "./components/Add";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={UserList} />
      <Route exact path="/add" component={Add} />
      <Route path="/update/:id" component={Add} />
    </Switch>
  );
};

export default App;
