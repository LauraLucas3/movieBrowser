// import de react et du carousel

import React from "react";
import axios from "axios";
import { useParams, useHistory, Switch, Route, Link } from "react-router-dom";
import Slider from "infinite-react-carousel";

// Import du composant genre

import Genre from "./genre";

export default function Detail(props) {
  // On détermine qu'aucune des icones du menu ne doit être colorée
  props.onChange(false, false, false);

  // Variables

  const settings = {
    // Paramètres du carousel
    arrows: false,
    centerMode: true,
    centerPadding: 80,
    duration: 100,
    shift: 10,
  };
  let { movieId } = useParams(); // On récupère l'id du film dans l'url
  let newMovieId = parseInt(movieId); // On la change de string à integer
  const [details, setDetails] = React.useState(null); // Variable où seront stockées toutes les données du film
  const [video, setVideo] = React.useState(null); // Variable où seront stockées toutes les données du trailer
  const [similars, setSimilars] = React.useState(null); // Variable où seront stockées toutes les données des films "similaires" à celui de la page
  const [trailer, setTrailer] = React.useState(false); // Variable boolean qui détermine si le trailer est actif ou non
  const [noTrailer, setNoTrailer] = React.useState(false); // Variable boolean qui détermine si le film possède un trailer ou non
  const months = [
    // Mois de l'année, cela va servir pour le formattage de la date de sortie du film
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
  let detailPlayButton = props.playImage; // On récupère une image des props
  const history = useHistory(); // On établit l'historique, qu'on va utiliser

  // Functions

  //Fonction pour récupérer l'année de sortie du film de la date

  function similarsDateYear(date) {
    let newDate = new Date(date);
    let newDateYear = newDate.getFullYear();
    return newDateYear;
  }

  // Fonction pour afficher les trailers des pages de détail
  // Si le bouton play est appuyé, cette fonction passe à true la variable trailer, qui remplacera l'image en haut de page par le trailer

  function setTrailerOn() {
    setTrailer(true);
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

  // Requêtes à l'API

  React.useEffect(() => {
    // Requête pour récupérer les données du film et les stocker dans la variable details

    axios.get(detailURL).then(function (response) {
      setDetails(response.data);
    });

    // Requête pour récupérer les données du trailer du film et les stocker dans la variable video

    axios.get(videoURL).then(function (response) {
      // Le if permet de déterminer si le film en question possède des vidéos comme des trailers ou des behind the scene
      // Si ce n'est pas le cas, on passe directement au else qui met à true la variable déterminant qu'il n'y a pas de trailer. Elle permettra de ne pas afficher le bouton play de la page

      if (response.data.results.length !== 0) {
        // On passe chaque objet de l'array pour récupérer uniquement le premier qui est un trailer.

        for (let i = 0; i <= response.data.results.length; i++) {
          if (response.data.results[i].type === "Trailer") {
            setVideo(response.data.results[i]);
            break;
          }
        }
      } else {
        setNoTrailer(true);
      }
    });

    // Requête pour récupérer les données des films similaires au film de la page

    axios.get(similarURL).then(function (response) {
      setSimilars(response.data.results);
    });
  }, [newMovieId, videoURL, detailURL, similarURL]);

  // Vérification que les données sont bien récupérées. Si ce n'est pas le cas, la page n'affichera rien
  // Pour la variable video, il est possible qu'elle soit vide, étant donné que certains films n'ont pas de trailer.
  // Ainsi, on détermine que c'est seulement quand la variable noTrailer -qui détermine s'il n'y a pas de trailer- est fausse,
  // qu'on regarde si video est vide

  if (!details || !similars || (noTrailer === false && !video)) return null;

  // Formattage de la date

  let releaseDate = new Date(details.release_date); // On passe la date de string à date
  let year = releaseDate.getFullYear(); // On récupère les différents éléments de la date : le jour, le mois et l'année
  let date = releaseDate.getDate();
  let monthIndex = releaseDate.getMonth(); // Pour le mois, comme on récupère un chiffre,
  let monthName = months[monthIndex]; // On va chercher le mois correspondant à ce chiffre dans l'array créée plus haut
  let formattedReleasedDate = `${monthName} ${date}, ${year}`; // On remet ensuite tout ensemble, dans le format nécessaire

  // Affichage

  return (
    <div>
      {/* On commence avec l'image en haut de page. 
      Pour presque tous les éléments de cette div, on met comme condition que noTrailer et trailer doivent être faux pour que ça s'affiche normalement
      Si noTrailer est vrai, le bouton play obtiendra la class "hiddenDetail", qui le mettra en "display : none", pour qu'il ne s'affiche pas
      Si trailer est vrai, l'image, le bouton play et le dégradé noir passeront en "display : none" avec la classe "hiddenDetail", tandis
      que la div du trailer perdra la classe "hiddenDetail", devenant visible à l'emplacement de l'image.
      
      Le bouton avec l'image "pathImage" est un bouton pour retourner à la page précédente. 
      
      À chaque clic vers un lien, que ce soit un genre ou un film similaire, voire le bouton "page précédente", les variables trailer et noTrailer sont
      remises à faux */}

      <div className="detailFrontImageContainer">
        <button
          className="pathImageContainer"
          onClick={() => {
            setTrailer(false);
            setNoTrailer(false);
            history.goBack();
          }}
        >
          <img className="pathImage" src={props.pathImage} alt="path" />
        </button>
        <button
          className={
            noTrailer === true
              ? "detailPlayButtonContainer hiddenDetail"
              : trailer === true
              ? "detailPlayButtonContainer hiddenDetail"
              : "detailPlayButtonContainer"
          }
          onClick={setTrailerOn}
          display={
            noTrailer === true ? "none" : trailer === true ? "none" : "flex"
          }
        >
          <img
            className={
              noTrailer === true
                ? "detailPlayButton hiddenDetail"
                : trailer === true
                ? "detailPlayButton hiddenDetail"
                : "detailPlayButton"
            }
            src={detailPlayButton}
            alt="play button"
          />
        </button>
        <div
          className={
            noTrailer === true
              ? "detailFrontGradient"
              : trailer === true
              ? "detailFrontGradient hiddenDetail"
              : "detailFrontGradient"
          }
        ></div>
        <img
          className={
            noTrailer === true
              ? "detailFrontImage"
              : trailer === true
              ? "detailFrontImage hiddenDetail"
              : "detailFrontImage"
          }
          src={"https://image.tmdb.org/t/p/original" + details.backdrop_path}
          alt="Movie poster"
        />
        <div
          className={
            noTrailer === true
              ? "youtubeTrailer hiddenDetail"
              : trailer === true
              ? "youtubeTrailer"
              : "youtubeTrailer hiddenDetail"
          }
        >
          <iframe
            height="287"
            src={
              noTrailer === true
                ? "#"
                : "https://youtube.com/embed/" + video.key
            }
            title="trailer video"
          ></iframe>
        </div>
      </div>

      {/* Cette première section contient le titre du film, sa durée, et sa note sur 10 sur IMDb */}

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

      {/* Cette deuxième section contient la date de sortie du film, qu'on a formatté plus haut, ainsi que les genres du film. Chaque bouton de genre
      est un lien vers la page de recherche du genre concerné */}

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
                <Link
                  to={`/discover/genre/` + element.id}
                  className="detailGenre"
                  onClick={() => {
                    setTrailer(false);
                    setNoTrailer(false);
                  }}
                >
                  {element.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cette section contient le synopsis du film */}

      <div className="detailSynopsisContainer">
        <p className="detailSynopsisTitle">Synopsis</p>
        <p className="detailSynopsis">{details.overview}</p>
      </div>

      {/* Cette section affiche les films similaires grâce au carousel. Chaque film de l'array est affiché grâce au .map. 
      Chaque "slide" est un lien vers la page détail du film */}
      <div className="detailRelatedMoviesContainer">
        <p className="detailRelatedMoviesTitle">Related Movies</p>
        <Slider {...settings}>
          {similars.map((element, i) => {
            return (
              <div className="relatedFilmSlide">
                <Link
                  className="relatedLink"
                  to={`/detail/` + element.id}
                  onClick={() => {
                    setTrailer(false);
                    setNoTrailer(false);
                  }}
                >
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

      {/* Router */}

      <Switch>
        <Route path={`/discover/genre/:genreId`}>
          <Genre />
        </Route>
      </Switch>
    </div>
  );
}
