import React, { Component } from 'react';
import axios from 'axios';
import SideNavBar from './SideNavBar';
import Dripples from './Dripples';


const SERVER_URL = 'http://www.localhost:3000/dripples.json';
// const SERVER_URL = 'http://2e148cc1.ngrok.io/dripples.json'; // TEST purposes

class DropSpace extends Component {
    constructor() {
        super();
        this.state = {
            dripples: []
        }
        // const fetchDripples = () => {
        //     axios.get(SERVER_URL).then((results) => {
        //         this.setState({dripples: results.data});
        //         // No need for recursively fetchDripples as this will automatically fetch each time a new Dripple is made by self user.
        //     })
        // }
        // fetchDripples();

        this.saveDripple = this.saveDripple.bind( this );
    }

    // No need for recursively fetchDripples as this will automatically fetch each time a new Dripple is made by self user.
    componentDidMount() {
        axios.get(SERVER_URL).then((results) => {
            this.setState({
                isLoaded: true,
                dripples: results.data
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }


    saveDripple(title, content, user_id) {
        console.log('post request', title, content, user_id);

        axios.post(SERVER_URL, {title: title, content: content, user_id: user_id}).then((response) => {
            console.log(response)
            this.setState({ dripples: [...this.state.dripples, response.data] })
        })
    }

    render() {
        const { error, isLoaded, dripples } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="body">
                    <SideNavBar />
                    <div className="content">
                        <Dripples allDripples={ dripples }/>
                        <CreateDrop onSubmit={ this.saveDripple }/>
                    </div>
                </div>
            )
        }
    }
}

class CreateDrop extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            user_id: 1 // HARDCODED, NEED TO REPLACE TO CURRENT_USER SESSION
        }
        this._handleSubmit = this._handleSubmit.bind( this );
        this._handleTitle = this._handleTitle.bind( this );
        this._handleContent = this._handleContent.bind( this );
    }

    _handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.title, this.state.content, this.state.user_id);
        this.setState({ title: '', content: '' });
    }

    // Need to save the value inside textarea to state first, so that submit button can take this.state values as parameters when calling parent function onSubmit
    _handleTitle(event) {
        this.setState({ title: event.target.value })
    }

    _handleContent(event) {
        this.setState({ content: event.target.value })
    }

    render () {
        return (
            <form onSubmit={ this._handleSubmit } >
                <textarea onChange={ this._handleTitle } value={ this.state.title }></textarea>
                <textarea onChange={ this._handleContent } value={ this.state.content }></textarea>
                <input type="submit" value="Save" />
                {/* maybe when fetch new dripple, add new dripple into state with previously populated dripples */}
            </form>
        )
    }
}

export default DropSpace;