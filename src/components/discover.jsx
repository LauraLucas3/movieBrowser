import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Genre from "./genre";
import axios from "axios";
import Titre from "./title";

export default function Discover() {
  const [posts, setPost] = React.useState(null);
  let match = useRouteMatch();

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
          console.log(element);
          return (
              <li className="discLinkContainer">
                <Link to={`${match.url}/` + element.name} className="discLink">{element.name}</Link>
              </li>
          )
        })}
        {/*<li>
          <Link to={`${match.url}/action`}>Action</Link>
        </li>
        <li>
          <Link to={`${match.url}/aventure`}>Aventure</Link>
        </li>*/}
      </ul>

      {/* The Topics page has its own <Switch> with more routes
            that build on the /topics URL path. You can think of the
            2nd <Route> here as an "index" page for all topics, or
            the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:genreId`}>
          <Genre />
        </Route>
        <Route path={match.path}>
          <h3>Please select a genre.</h3>
        </Route>
      </Switch>
    </div>
  );
}
