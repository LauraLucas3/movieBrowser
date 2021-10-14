import React from "react";
import Titre from "./title";
import axios from "axios";
/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";*/

export default function Home() {
  const randomTrend = Math.floor(Math.random() * 10);
  const [trends, setTrend] = React.useState(null);
  const [screenTrend, setScreenTrend] = React.useState(null);

  React.useEffect(() => {
    axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=361afc4be8d70ed5f0b64b50759fe3d5")
      .then(function(response) {
        setTrend(response.data.results.slice(0, 10));
      });
  }, []);
  
  if (trends !== null && screenTrend === null) {
      setScreenTrend(trends[randomTrend]);
  };
  
  console.log(screenTrend);

  if(!screenTrend) return null;

  return (
    <div>
      <Titre />
      <h2>Home</h2>
      <div className="trendImageContainer">
        <img className="trendImage" src={"https://image.tmdb.org/t/p/original" + screenTrend.backdrop_path} alt="Trend" />
      </div>
      
    </div>
  );
}
