import React, { Component } from 'react';
import SideNavBar from './SideNavBar';
import axios from 'axios';

const CATEGORY_URL = 'http://localhost:3000/api/categories.json';
const TAG_URL = 'http://localhost:3000/api/tags.json';


class SearchDripples extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            tags: [],
        }

        this._handleSubmit = this._handleSubmit.bind( this );
        this._handleCategoryChange = this._handleCategoryChange.bind( this );
        this._handleTagChange = this._handleTagChange.bind( this );
    }

    componentDidMount() {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios({method: 'get', url: CATEGORY_URL, headers: {'Authorization': token}}).then(response => {
            console.log(response.data);
            this.setState({categories: response.data})
        })
        axios({method: 'get', url: TAG_URL, headers: {'Authorization': token}}).then(response => {
            console.log(response.data);
            this.setState({tags: response.data})
        })
    }

    _handleSubmit(e) {
        e.preventDefault()
        console.log(this.state);
    }

    _handleCategoryChange(e) {
        this.setState({ categories: e.target.value })
    }

    _handleTagChange(e) {
        this.setState({ tags: e.target.value})
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
                            {this.state.categories.map((c) => 
                                <option key={c.id}>{c.name}</option>
                            )}
                        </select>

                        <label>Tag</label>
                        <select onChange={ this._handleTagChange }>
                            <option>None</option>
                            {this.state.tags.map((t) => 
                                <option key={t.id}>{t.tag_name}</option>
                            )}
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

export default SearchDripples;