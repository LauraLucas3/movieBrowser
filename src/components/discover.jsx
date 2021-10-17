import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Genre from "./genre";
import axios from "axios";
import Titre from "./title";

export default function Discover(props) {
  const [posts, setPost] = React.useState(null);
  const [selectedGenre, setSelectGenre] = React.useState(null);
  props.onChange(false, true, false);

  function handleChange(newValue) {
    setSelectGenre(newValue);
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

  console.log(posts);

  if (!posts) return null;

  return (
    <div>
      <Titre />
      <h2>Discover</h2>

      <ul className="discScroll">
        {posts.map((element, i) => {
          if (selectedGenre !== null) {
            if (selectedGenre === element.name) {
              document.getElementById(element.name).focus();
            }
          }
          return (
            <li className="discLinkContainer">
              <Link
                to={`/discover/` + element.name}
                className="discLink"
                id={element.name}
              >
                {element.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <Switch>
        <Route path={`/discover/:genreId`}>
          <Genre onLoad={handleChange} />
        </Route>
        <Route path={`/discover`}>
          <h3>Please select a genre.</h3>
        </Route>
      </Switch>
    </div>
  );
}
