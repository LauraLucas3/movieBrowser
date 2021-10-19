import React from "react";
import axios from "axios";
import SearchItem from "./searchItem";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searchMovies: [],
            loading: false,
            page: 1,
            prevY: 1
        };
        this.getSearchDatas = this.getSearchDatas.bind(this);
        this.handleObserver = this.handleObserver.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    getSearchDatas(page) {
        if (this.props.encodedSearch.length >= 1) {
            this.setState({ loading: true });

            axios
                .get(
                    "https://api.themoviedb.org/3/search/movie?api_key=361afc4be8d70ed5f0b64b50759fe3d5&language=en-US&query=" + this.props.encodedSearch + "&page=" + page + "&include_adult=false"
                )
                .then(response => {
                    this.setState({ searchMovies: [ ...this.state.searchMovies, ...response.data.results] });
                    this.setState({ searchResults: response.data });
                    this.setState({ loading: false });
            });
        }
        
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const curPage = this.state.searchResults.page;
            this.getSearchDatas(curPage + 1);
            this.setState({ page: curPage + 1 });
        }
        this.setState({ prevY: y + 1});
    }

    componentDidMount() {
        this.getSearchDatas(this.state.page);

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
        if (this.state.searchResults === []) {
            return null;
        } else if (this.state.searchMovies === []) {
            return null;
        } else {
            console.log(this.state.searchMovies);

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
                        {this.state.searchMovies.filter(function(element) {
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