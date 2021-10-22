// Import react et axios

import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";

// Import des composents

import Trend from "./trend";
import Titre from "./title";
import Detail from "./detail";

export default function Home(props) {
  // Variables

  const randomTrend = Math.floor(Math.random() * 10); // On détermine un chiffre aléatoire entre 0 et 9, qui servira à déterminer quelle trend sera en tête de page
  const [trends, setTrend] = React.useState(null); // Variable où seront stockées les données des trends
  const [screenTrend, setScreenTrend] = React.useState(null); // Varialbe où seront stockées les données de la trend en tête de page
  props.onChange(true, false, false);

  React.useEffect(() => {
    
    // La requête axios pour récupérer les trends. On utilise slice pour ne récupérer que les 10 premières trends

    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=361afc4be8d70ed5f0b64b50759fe3d5"
      )
      .then(function (response) {
        setTrend(response.data.results.slice(0, 10));
      });
  }, []);

  // Si les données ont bien été stockées dans trends, on détermine les données de screenTrend aléatoirement grâce au nombre généré dans randomTrend
  // On précise que screenTrend doit toujours être null pour que ça s'applique afin d'éviter une boucle infinie

  if (trends !== null && screenTrend === null) {
    setScreenTrend(trends[randomTrend]);
  }

  // Afin que la page ne s'affiche que si toutes les données sont récupérées, la page n'affichera rien si les données ne le sont pas

  if (!screenTrend || !trends) return null;

  return (
    <div>
      <Titre />

      {/*Trend de tête de page*/}

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

      {/*Lien vers le composant générant les autres trends. On lui passe les données des trends en props*/}

      <Trend
        trends={trends}
        screenTrend={screenTrend}
        pathImage={props.pathImage}
        trendStar={props.trendStar}
      />

      {/*Router vers les pages de détail*/}

      <Switch>
        <Route path={`/detail/:movieId`}>
          <Detail />
        </Route>
      </Switch>
    </div>
  );
}
