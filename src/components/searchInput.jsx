import React from "react";

export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onSearchValueChange(e.target.value);
    }

    render() {
        const search = this.props.search;

        return(
            <div className="searchBar">
                <img className="DiscGlass" src={this.props.discSearch} alt="discover search bar" />
                <input value={search} onChange={this.handleChange} />
            </div>
        )
    }
}