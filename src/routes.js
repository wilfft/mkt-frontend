import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Logon from "./pages/Logon";
import Register from "./pages/Register";
import NewProduct from "./pages/NewProduct";
import Profile from "./pages/Profile";
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/product/new" component={NewProduct} />
      </Switch>
    </BrowserRouter>
  );
}
c;
