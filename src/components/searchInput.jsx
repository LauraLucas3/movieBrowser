// Import react

import React from "react";

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // Fonction récupérée des props. Quand la valeur de l'input change, la valeur de la variable search dans App.js change aussi.

  handleChange(e) {
    this.props.onSearchValueChange(e.target.value);
  }

  // Affichage

  render() {
    const search = this.props.search;

    return (
      <div className="searchBar">
        <img
          className="DiscGlass"
          src={this.props.discSearch}
          alt="discover search bar"
        />
        <input value={search} onChange={this.handleChange} />
      </div>
    );
  }
}
