import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/home";
import Discover from "./components/discover";
import Profil from "./components/profil";
import "./App.css";
import homeIcone from "./img/Home.png";
import discoverIcone from "./img/discoverIcone.png";
import profilIcone from "./img/profilIcone.png";
import selectedHome from "./img/selectedHome.png";
import selectedDiscoverIcone from "./img/selectedDiscoverIcone.png";
import selectedProfilIcone from "./img/selectedProfilIcone.png";
import playButton from "./img/playButton.png";
import Detail from "./components/detail";
import detailPlayButton from "./img/detailPlay2.png";
import path from "./img/Path.png";
import detailStar from "./img/detailStar.png";
import detailTime from "./img/detailTime.png";
import trendStar from "./img/trendStar.png";

export default function App() {
  const [isHome, setIsHome] = React.useState(false);
  const [isDisc, setIsDisc] = React.useState(false);
  const [isProfil, setIsProfil] = React.useState(false);

  function handleChange(newValue1, newValue2, newValue3) {
    setIsHome(newValue1);
    setIsDisc(newValue2);
    setIsProfil(newValue3);
  }

  return (
    <Router>
      <div>
        <ul className="menuLinks">
          <li>
            <Link
              to="/"
              onClick={() => {
                setIsHome(true);
                setIsDisc(false);
                setIsProfil(false);
              }}
            >
              <img
                className="homeLogo"
                src={isHome === true ? selectedHome : homeIcone}
                alt="home icone"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/discover"
              onClick={() => {
                setIsHome(false);
                setIsDisc(true);
                setIsProfil(false);
              }}
            >
              <img
                className="discoverLogo"
                src={isDisc === true ? selectedDiscoverIcone : discoverIcone}
                alt="discover icone"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/profil"
              onClick={() => {
                setIsHome(false);
                setIsDisc(false);
                setIsProfil(true);
              }}
            >
              <img
                className="profilLogo"
                src={isProfil === true ? selectedProfilIcone : profilIcone}
                alt="profil icone"
              />
            </Link>
          </li>
        </ul>

        <Switch>
          <Route path="/discover">
            <Discover onChange={handleChange} />
          </Route>
          <Route path="/profil">
            <Profil onChange={handleChange}/>
          </Route>
          <Route path={`/detail/:movieId`}>
            <Detail
              onChange={handleChange}
              playImage={detailPlayButton}
              pathImage={path}
              detailStar={detailStar}
              detailTime={detailTime}
            />
          </Route>
          <Route path="/">
            <Home playImage={playButton} onChange={handleChange} pathImage={path} trendStar={trendStar} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
