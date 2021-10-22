// Import react

import React from "react";
import { Switch, Route, NavLink, Link } from "react-router-dom";

// Import des composants

import Genre from "./genre";
import axios from "axios";
import Titre from "./title";
import SearchInput from "./searchInput";
import Search from "./search";

export default function Discover(props) {
  // Variables
  const [posts, setPost] = React.useState(null); // Variable où seront stockées les données des genres de films, pour le menu
  const [selectedGenre, setSelectedGenre] = React.useState(null);
  props.onChange(false, true, false); // Indique que l'icône de la page discover est allumé, donc coloré

  // Fonctions

  function handleChange(newValue) {
    setSelectedGenre(newValue);
  }

  React.useEffect(() => {
    // Requête axios pour récupérer la liste des différents genres de films

    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=361afc4be8d70ed5f0b64b50759fe3d5&language=en-US"
      )
      .then(function (response) {
        // handle success
        setPost(response.data.genres);
      });
  }, []);

  // Si la variable post est null, la page n'affiche rien

  if (!posts) return null;

  return (
    <div>
      <Titre />

      {/* Barre de recherche. Quand l'utilisateur clique dessus, ça affiche la page search, affichant les résultats de la recherche tapée */}

      <Link to="/discover/search">
        <SearchInput
          search={props.search}
          onSearchValueChange={props.onSearchValueChange}
          discSearch={props.discSearch}
        />
      </Link>

      {/* .map permettant d'afficher tous les genres de film dans un menu. Chaque genre est un lien menant à sa page de recherche */}

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

      {/* Router vers les pages de genre ou vers la page de recherche.
      Des key sont utilisées pour permettre à la page de renouveler son affichage à chaque changement */}

      <Switch>
        <Route path={`/discover/genre/:genreId`}>
          <Genre handleChange={handleChange} key={selectedGenre} />
        </Route>
        <Route path="/discover/search">
          <Search
            search={props.search}
            onSearchValueChange={props.onSearchValueChange}
            encodedSearch={props.encodedSearch}
            key={props.search}
          />
        </Route>
        <Route path={`/discover`}></Route>
      </Switch>
    </div>
  );
}
