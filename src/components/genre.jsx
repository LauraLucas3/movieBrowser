import React from "react";
import { useParams } from "react-router-dom";

export default function Genre(props) {
  let { genreId } = useParams();
  props.onLoad(genreId);
  return <h3>Requested genre ID: {genreId}</h3>;
}
