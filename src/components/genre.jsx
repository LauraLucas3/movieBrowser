// Import react

import React from "react";
import { useParams } from "react-router-dom";

// Import le composant scrollComponent

import ScrollComponent from "./scrollComponent";

export default function Genre(props) {
  // Variables

  let { genreId } = useParams(); // On récupère l'id du genre dans l'url
  let numberGenreId = parseInt(genreId); // On le transforme de string à integer
  const [films, setFilms] = React.useState([]); // Variable dans laquelle seront stockés les résultats de la requête axios dans le composant scrollComponent
  props.handleChange(numberGenreId); // On détermine dans la page discover que le genre actif est celui de l'id récupéré

  // Fonction pour changer la valeur de films. On va passer cette fonction dans le component ScrollComponent

  function onGenreChange(newValue) {
    setFilms(newValue);
  }

  return (
    <div>
      <ScrollComponent
        genreId={genreId}
        films={films}
        onGenreChange={onGenreChange}
        key={numberGenreId}
      />
    </div>
  );
}
