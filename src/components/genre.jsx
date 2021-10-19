import React from "react";
import { useParams } from "react-router-dom";
import ScrollComponent from "./scrollComponent";

export default function Genre(props) {
  let { genreId } = useParams();
  let numberGenreId = parseInt(genreId);
  const [films, setFilms] = React.useState([]);
  props.handleChange(numberGenreId);

  function onGenreChange(newValue) {
    setFilms(newValue);
  }

  return (
    <div>
      <ScrollComponent genreId={genreId} films={films} onGenreChange={onGenreChange} key={numberGenreId} />
    </div>
  );
}
