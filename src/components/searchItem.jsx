// Import react

import React from "react";
import { Link } from "react-router-dom";

export default function SearchItem(props) {
  // Fonction pour récupérer l'année de la date

  function similarsDateYear(date) {
    let newDate = new Date(date);
    let newDateYear = newDate.getFullYear();
    return newDateYear;
  }

  return (
    <div className="searchResultsContainer">
      <Link className="searchLink" to={`/detail/` + props.id}>
        <div className="searchFilmImageContainer">
          <div className="searchGradient"></div>
          <img
            className="searchFilm"
            src={"https://image.tmdb.org/t/p/original" + props.image_path}
            alt={props.title}
          />
        </div>
        <p className="searchFilmTitle">
          {props.title}
          <span> ({similarsDateYear(props.release_date)})</span>
        </p>
      </Link>
    </div>
  );
}
