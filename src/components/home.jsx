import React from "react";
import Titre from "./title";
import axios from "axios";
import Trend from "./trend";
import { Switch, Route, Link } from "react-router-dom";
import Detail from "./detail";

export default function Home(props) {
  const randomTrend = Math.floor(Math.random() * 10);
  const [trends, setTrend] = React.useState(null);
  const [screenTrend, setScreenTrend] = React.useState(null);
  props.onChange(true, false, false);

  React.useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=361afc4be8d70ed5f0b64b50759fe3d5"
      )
      .then(function (response) {
        setTrend(response.data.results.slice(0, 10));
      });
  }, []);

  if (trends !== null && screenTrend === null) {
    setScreenTrend(trends[randomTrend]);
  }

  if (!screenTrend || !trends) return null;

  return (
    <div>
      <Titre />
      <Link to={`/detail/` + screenTrend.id} className="trendLink">
        <div className="trendImageContainer">
          <div className="screenTrendLegend">
            <img
              className="screenTrendPlay"
              src={props.playImage}
              alt="play button"
            />
            <div className="screenTrendText">
              <p className="screenTrendSpotlight">Movie Spotlight</p>
              <p className="screenTrendTitle">{screenTrend.title}</p>
            </div>
          </div>
          <img
            className="trendImage"
            src={
              "https://image.tmdb.org/t/p/original" + screenTrend.backdrop_path
            }
            alt="Trend"
          />
        </div>
      </Link>

      <Trend
        trends={trends}
        screenTrend={screenTrend}
        pathImage={props.pathImage}
        trendStar={props.trendStar}
      />

      <Switch>
        <Route path={`/detail/:movieId`}>
          <Detail />
        </Route>
      </Switch>
    </div>
  );
}
