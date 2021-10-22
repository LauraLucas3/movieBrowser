// Import de react et du package pour le carrousel

import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Slider from "infinite-react-carousel";

// Import du composent détail

import Detail from "./detail";

export default function Trend(props) {
  // Variables

  const settings = {
    // Paramètres du carrousel
    arrows: false,
    centerMode: true,
    centerPadding: 70,
    duration: 100,
    shift: 30,
  };

  // Affichage

  return (
    <div>
      <h2 className="trendingTitle">Trending</h2>
      <Slider {...settings}>
        {/*On applique les paramètres au carrousel*/}
        {
          // On fait un .map pour appliquer cet affichage à chaque trend de l'array
          // eslint-disable-next-line array-callback-return
          props.trends.map((element, i) => {
            if (element.id !== props.screenTrend.id)
              return (
                <div className="slide">
                  <Link
                    className="otherTrendsLink"
                    to={`/detail/` + element.id}
                  >
                    <div className="otherTrendsRate">
                      <p className="trendsIMDb">IMDb</p>
                      <div className="otherTrendsRateStarContainer">
                        <img
                          className="trendsStarRate"
                          src={props.trendStar}
                          alt="trends rate star"
                        />
                        <p className="trendsRateNumber">
                          {element.vote_average}
                        </p>
                      </div>
                    </div>
                    <div className="trendsTitleContainer">
                      <p className="trendsTitle">{element.title}</p>
                    </div>
                    <div className="otherTrendsGradient"></div>
                    <img
                      className="otherTrendsImage"
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        element.backdrop_path
                      }
                      alt={element.title}
                    />
                  </Link>
                </div>
              );
          })
        }
      </Slider>

      {/*Router vers les pages de détail*/}

      <Switch>
        <Route path={`/detail/:movieId`}>
          <Detail />
        </Route>
      </Switch>
    </div>
  );
}
