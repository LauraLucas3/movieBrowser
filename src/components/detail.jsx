import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Detail() {
    let { movieId } = useParams();
    let newMovieId = parseInt(movieId);
    const [details, setDetails] = React.useState(null);
    let detailURL = "https://api.themoviedb.org/3/movie/"+ newMovieId + "?api_key=361afc4be8d70ed5f0b64b50759fe3d5&language=en-US";

    React.useEffect(() => {
        axios.get(detailURL)
          .then(function(response) {
            setDetails(response.data);
          });
      }, [newMovieId, detailURL]);

      console.log(details);

      if(!details) return null;

    return ( 
        <div>
            <h2>Details on movie : {newMovieId}</h2>
        </div>
    );
}