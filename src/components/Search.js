import React, { Component } from 'react';
import SideNavBar from './SideNavBar';
import axios from 'axios';

const CATEGORY_URL = 'http://localhost:3000/api/categories.json';
const TAG_URL = 'http://localhost:3000/api/tags.json';


class Search extends Component {
    constructor() {
        super();
        this.state = {
            category: '',
            tag: '',
        }

        this._handleSubmit = this._handleSubmit.bind( this );
        this._handleCategoryChange = this._handleCategoryChange.bind( this );
        this._handleTagChange = this._handleTagChange.bind( this );
    }

    // componentDidMount() {
    //     let token = "Bearer " + localStorage.getItem("jwt");
    //     axios({method: 'get', })
    // }

    _handleSubmit(e) {
        e.preventDefault()
        console.log(this.state);
    }

    _handleCategoryChange(e) {
        this.setState({ category: e.target.value })
    }

    _handleTagChange(e) {
        this.setState({ tag: e.target.value})
    }

    render() {
        return (
            <div className="body">
                <SideNavBar />
                <div className="content">
                    <form onSubmit={ this._handleSubmit }>
                        <label>Category</label>
                        <select onChange={ this._handleCategoryChange }>
                            <option>None</option>
                            <option>category 1</option>
                            <option>category 2</option>
                            <option>category 3</option>
                        </select>

                        <label>Tag</label>
                        <select onChange={ this._handleTagChange }>
                            <option>None</option>
                            <option>tag 1</option>
                            <option>tag 2</option>
                            <option>tag 3</option>
                        </select>
                        <button type="submit">Search</button>
                    </form>
                    <p>should be a component that renders a filter form</p>
                    <p>user selects filter options and clicks on search</p>
                    <p>
                        match dripple with a dripple from another user that has similar matches
                    </p>
                    <p>
                        this should remove all dripples in current state and fill with new dripples from multiple users
                    </p>
                </div>
            </div>
        )
    }
}

export default Search;