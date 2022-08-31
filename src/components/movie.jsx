import { getMovies } from "../services/fakeMovieService";
import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    currentListGroup: {},
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: 0 }, ...getGenres()];
    this.setState({ movies: getMovies(), genres, currentListGroup: genres[0] });
  }
  handelDelete = (movie) => {
    const newList = this.state.movies.filter((m) => m !== movie);
    this.setState({ movies: newList, currentPage: 1 });
  };
  handelLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handelPageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handelListGroup = (genre) => {
    this.setState({ currentListGroup: genre, currentPage: 1 });
  };
  handelSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      currentListGroup,
      movies: allMovies,
      sortColumn,
    } = this.state;
    const filtered =
      currentListGroup && currentListGroup._id
        ? allMovies.filter((m) => m.genre._id === currentListGroup._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, genres, currentListGroup, sortColumn } =
      this.state;
    const { totalCount, data: movies } = this.getPageData();
    return (
      <main className="container mt-5">
        <div className="row">
          <div className="col-3">
            <ListGroup
              currentListGroup={currentListGroup}
              onClick={this.handelListGroup}
              genres={genres}
            />
          </div>
          <div className="col-9">
            {count === 0 ? (
              <h3>There are no movies in the database.</h3>
            ) : (
              <div>
                <h3>Showing {totalCount} movies in the database.</h3>
                <MoviesTable
                  movies={movies}
                  onDelete={this.handelDelete}
                  onLike={this.handelLike}
                  onSort={this.handelSort}
                  sortColumn={sortColumn}
                />
                <Pagination
                  currentPage={currentPage}
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  onPageChange={this.handelPageChange}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default Movie;
