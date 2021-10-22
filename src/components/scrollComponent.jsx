// Import react et axios

import React from "react";
import axios from "axios";

// Import le composant searchItem

import SearchItem from "./searchItem";

export default class ScrollComponent extends React.Component {
  constructor(props) {
    super(props);
    // Variable
    this.state = {
      movies: [], // Cette variable va stocker les résultats généraux de la requête axios, pour avoir notamment le numéro de page de la recherche, nécessaire au scroll infini
      loading: false, // Détermine si la requête axios est en cours ou non
      page: 1, // Indique le numéro de la page recherchée dans la requête
      prevY: 1,
      genre: props.genreId, // On récupère l'id du genre dans les props
    };

    this.getMovieDatas = this.getMovieDatas.bind(this);
    this.handleObserver = this.handleObserver.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // Fonction pour récupérer les premiers films du genre sélectionné, avec le numéro de page comme variable

  getMovieDatas(page) {
    this.setState({ loading: true });

    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=361afc4be8d70ed5f0b64b50759fe3d5&language=en-US&include_adult=false&page=" +
          page +
          "&with_genres=" +
          this.state.genre
      )
      .then((response) => {
        this.setState({ movies: response.data });
        this.props.onGenreChange([
          ...this.props.films,
          ...response.data.results,
        ]);
        this.setState({ loading: false });
      });
  }

  // Fonction qui permet d'augmenter le numéro de la page qui sera utilisée dans la requête axios

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const curPage = this.state.movies.page;
      this.getMovieDatas(curPage + 1);
      this.setState({ page: curPage + 1 });
    }
    this.setState({ prevY: y + 1 });
  }

  // Quand l'utilisateur atteint la div de bas de page "Loading", cette fonction s'active et lance la requête axios pour la page suivante
  // Une fois cela fait, la fonction handleObserver augmente le numéro de la page de 1 pour la prochaine requête à venir

  componentDidMount() {
    this.getMovieDatas(this.state.page);

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  render() {
    // On établit que si l'une des deux variables est vide, la page n'affichera rien
    if (this.props.films === []) {
      return null;
    } else if (this.state.movies === []) {
      return null;
    } else {
      // Additional css / CSS sommaire de la div Loading

      const loadingCSS = {
        height: "100px",
        margin: "30px",
      };

      // Quand l'utilisateur arrive en bas de la page, si la requête axios est en cours, mettant la variable loading à true, la div Loading ne s'affiche pas

      const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

      return (
        <div className="searchAllContainer">
          <div className="searchStyleContainer">
            {this.props.films
              .filter(function (element) {
                if (element.poster_path === null) {
                  return false;
                }
                return true;
              })
              .map((element, i) => (
                <SearchItem
                  id={element.id}
                  title={element.title}
                  image_path={element.poster_path}
                  release_date={element.release_date}
                />
              ))}
          </div>
          <div
            ref={(loadingRef) => (this.loadingRef = loadingRef)}
            style={loadingCSS}
          >
            <span style={loadingTextCSS}>Loading...</span>
          </div>
        </div>
      );
    }
  }
}
