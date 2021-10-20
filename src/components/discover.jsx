import React from "react";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import Genre from "./genre";
import axios from "axios";
import Titre from "./title";
import SearchInput from "./searchInput";
import Search from "./search";

export default function Discover(props) {
  const [posts, setPost] = React.useState(null);
  const [selectedGenre, setSelectedGenre] = React.useState(null);
  props.onChange(false, true, false);

  function handleChange(newValue) {
    setSelectedGenre(newValue);
  }

  React.useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=361afc4be8d70ed5f0b64b50759fe3d5&language=en-US"
      )
      .then(function (response) {
        // handle success
        setPost(response.data.genres);
      });
  }, []);

  if (!posts) return null;

  return (
    <div>
      <Titre />
      <Link to="/discover/search">
      <SearchInput search={props.search} onSearchValueChange={props.onSearchValueChange} discSearch={props.discSearch} /></Link>

      <ul className="discScroll">
        {posts.map((element, i) => {
          return (
            <li className="discLinkContainer">
              <NavLink
                to={`/discover/genre/` + element.id}
                className="discLink"
                id={element.name}
                activeClassName="genreFocus"
              >
                {element.name}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <Switch>
        <Route path={`/discover/genre/:genreId`}>
          <Genre handleChange={handleChange} key={selectedGenre} />
        </Route>
        <Route path="/discover/search">
          <Search search={props.search} onSearchValueChange={props.onSearchValueChange} encodedSearch={props.encodedSearch} key={props.search} />
        </Route>
        <Route path={`/discover`}>
        </Route>
      </Switch>
    </div>
  );
}
