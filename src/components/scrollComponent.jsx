import React from "react";
import axios from "axios";
import SearchItem from "./searchItem";

export default class ScrollComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: false,
            page: 1,
            prevY: 1,
            genre: props.genreId
        };

        this.getMovieDatas = this.getMovieDatas.bind(this);
        this.handleObserver = this.handleObserver.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    getMovieDatas(page) {
        this.setState({ loading: true });

        axios
            .get(
                "https://api.themoviedb.org/3/discover/movie?api_key=361afc4be8d70ed5f0b64b50759fe3d5&language=en-US&include_adult=false&page=" + page + "&with_genres=" + this.state.genre
            )
            .then(response => {
                this.setState({ movies: response.data });
                this.props.onGenreChange([...this.props.films, ...response.data.results]);
                this.setState({ loading: false });
        });
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const curPage = this.state.movies.page;
            this.getMovieDatas(curPage + 1);
            this.setState({ page: curPage + 1 });
        }
        this.setState({ prevY: y + 1});
    }

    componentDidMount() {
        this.getMovieDatas(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
      }
    
      

    render() {
        if (this.props.films === []) {
            return null;
        } else if (this.state.movies === []) {
            return null;
        } else {
            // Additional css
            const loadingCSS = {
                height: "100px",
                margin: "30px"
            };

            // To change the loading icon behavior
            const loadingTextCSS = {display: this.state.loading ? "block" : "none"};

            return (
                <div className="searchAllContainer">
                    <div className="searchStyleContainer">
                        {this.props.films.filter(function(element) {
                            if (element.poster_path === null) {
                                return false;
                            }
                            return true;
                        }).map((element, i) => (
                            <SearchItem id={element.id} title={element.title} image_path={element.poster_path} release_date={element.release_date} />
                        ))}
                    </div>
                    <div ref={loadingRef => (this.loadingRef = loadingRef)} style={loadingCSS}>
                        <span style={loadingTextCSS}>Loading...</span>
                        </div>
                </div>
            );
        }
        
    }
}