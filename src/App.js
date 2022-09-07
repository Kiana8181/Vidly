import React, { Component } from "react";
import Movie from "./components/movie";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <main>
        <NavBar />
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movie} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
