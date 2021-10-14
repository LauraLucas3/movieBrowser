import React from "react";
import { useParams } from "react-router-dom";

export default function Genre() {
  let { genreId } = useParams();
  return <h3>Requested genre ID: {genreId}</h3>;
}
