import { getMovies, deleteMovie } from "../services/movieService";
import React, { Component } from "react";
import { toast } from "react-toastify";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./searchBox";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    currentListGroup: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Genres", _id: 0 }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres, currentListGroup: genres[0] });
  }
  handelDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const newList = originalMovies.filter((m) => m !== movie);
    this.setState({ movies: newList, currentPage: 1 });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies, currentPage: 1 });
    }
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
    this.handelGenreSelect(genre);
    this.setState({ currentListGroup: genre, currentPage: 1 });
  };
  handelSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handelSearch = (query) => {
    this.setState({
      searchQuery: query,
      currentListGroup: null,
      currentPage: 1,
    });
  };
  handelGenreSelect = (genre) => {
    this.setState({ searchQuery: "", currentListGroup: genre, currentPage: 1 });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      currentListGroup,
      movies: allMovies,
      sortColumn,
      searchQuery,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentListGroup && currentListGroup._id)
      filtered = allMovies.filter((m) => m.genre._id === currentListGroup._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      currentListGroup,
      sortColumn,
      searchQuery,
    } = this.state;
    const { user } = this.props;
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
            {user && (
              <Link className="btn btn-primary mb-3" to="/movies/new">
                New Movie
              </Link>
            )}
            {count === 0 ? (
              <h3>There are no movies in the database.</h3>
            ) : (
              <div>
                <h3>Showing {totalCount} movies in the database.</h3>
                <SearchBox value={searchQuery} onChange={this.handelSearch} />
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
