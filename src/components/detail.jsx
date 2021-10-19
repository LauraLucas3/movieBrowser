/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import { useParams, useHistory, Switch, Route, Link } from "react-router-dom";
import Genre from "./genre";
import Slider from "infinite-react-carousel";

export default function Detail(props) {
  props.onChange(false, false, false);

  //variables

  const settings = {
    arrows: false,
    centerMode: true,
    centerPadding: 140,
    duration: 100,
    shift: 10,
  };
  let { movieId } = useParams();
  let newMovieId = parseInt(movieId);
  const [details, setDetails] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [similars, setSimilars] = React.useState(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let detailPlayButton = props.playImage;
  const history = useHistory();

  // Functions

  function similarsDateYear(date) {
    let newDate = new Date(date);
    let newDateYear = newDate.getFullYear();
    return newDateYear;
  }

  // URLs

  let detailURL =
    "https://api.themoviedb.org/3/movie/" +
    newMovieId +
    "?api_key=361afc4be8d70ed5f0b64b50759fe3d5&language=en-US";
  let videoURL =
    "https://api.themoviedb.org/3/movie/" +
    newMovieId +
    "/videos?api_key=361afc4be8d70ed5f0b64b50759fe3d5&language=en-US";
  let similarURL =
    "https://api.themoviedb.org/3/movie/" +
    newMovieId +
    "/similar?api_key=361afc4be8d70ed5f0b64b50759fe3d5&language=en-US";

  //requêtes à l'API

  React.useEffect(() => {
    axios.get(detailURL).then(function (response) {
      setDetails(response.data);
    });
    axios.get(videoURL).then(function (response) {
      setVideo(response.data.results[0]);
    });
    axios.get(similarURL).then(function (response) {
      setSimilars(response.data.results);
    });
  }, [newMovieId, videoURL, detailURL, similarURL]);

  //vérification que les données sont bien récupérées

  if (!details || !video || !similars) return null;

  console.log(video);

  //formattage de la date

  let releaseDate = new Date(details.release_date);
  let year = releaseDate.getFullYear();
  let date = releaseDate.getDate();
  let monthIndex = releaseDate.getMonth();
  let monthName = months[monthIndex];
  let formattedReleasedDate = `${monthName} ${date}, ${year}`;

  // Affichage

  return (
    <div>
      <div className="detailFrontImageContainer">
        <button className="pathImageContainer" onClick={() => history.goBack()}>
          <img className="pathImage" src={props.pathImage} alt="path" />
        </button>
        <div className="detailPlayButtonContainer">
          <img
            className="detailPlayButton"
            src={detailPlayButton}
            alt="play button"
          />
        </div>
        <div className="detailFrontGradient"></div>
        <img
          className="detailFrontImage"
          src={"https://image.tmdb.org/t/p/original" + details.backdrop_path}
          alt="Movie poster"
        />
      </div>
      <div className="detailInfosContainer">
        <div className="detailTitleContainer">
          <h2 className="detailTitle">{details.title}</h2>
          <p className="detailRes">4K</p>
        </div>
        <div className="detailAddInfosContainer">
          <img
            className="detailDurationImage"
            src={props.detailTime}
            alt="duration"
          />
          <p className="detailDuration">{details.runtime} minutes</p>
          <img className="detailRateImage" src={props.detailStar} alt="rate" />
          <p className="detailRate">{details.vote_average} (IMDb)</p>
        </div>
      </div>
      <div className="detailInfosTwoContainer">
        <div className="detailReleaseContainer">
          <p className="detailReleaseTitle">Release date</p>
          <p className="detailReleaseDate">{formattedReleasedDate}</p>
        </div>
        <div className="detailGenresContainer">
          <p className="detailGenresTitle">Genre</p>
          <div className="detailGenresGroup">
            {details.genres.map((element, i) => {
              return (
                <Link to={`/discover/` + element.name} className="detailGenre">
                  {element.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="detailSynopsisContainer">
        <p className="detailSynopsisTitle">Synopsis</p>
        <p className="detailSynopsis">{details.overview}</p>
      </div>
      <div className="detailRelatedMoviesContainer">
        <p className="detailRelatedMoviesTitle">Related Movies</p>
        <Slider {...settings}>
          {similars.map((element, i) => {
            return (
              <div className="relatedFilmSlide">
                <Link className="relatedLink" to={`/detail/` + element.id}>
                  <div className="relatedFilmImageContainer">
                  <div className="relatedGradient"></div>
                  <img
                    className="relatedFilm"
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      element.backdrop_path
                    }
                    alt={element.title}
                  />
                  </div>
                  <p className="relatedFilmTitle">
                    {element.title}
                    <span> ({similarsDateYear(element.release_date)})</span>
                  </p>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>

      <Switch>
        <Route path={`/discover/:genreId`}>
          <Genre />
        </Route>
      </Switch>
    </div>
  );
}
