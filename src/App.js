import { getMovies } from "./services/fakeMovieService";
import React, { Component } from "react";

class Movie extends Component {
  state = { movies: getMovies() };
  handelDelete = (movie) => {
    const newList = this.state.movies.filter((m) => m !== movie);
    this.setState({ movies: newList });
  };
  render() {
    return (
      <main className="container mt-5">
        {this.state.movies.length === 0 ? (
          <h3>There are no movies in the database.</h3>
        ) : (
          <h3>Showing {this.state.movies.length} movies in the database.</h3>
        )}
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handelDelete(movie)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
  }
}

export default Movie;
