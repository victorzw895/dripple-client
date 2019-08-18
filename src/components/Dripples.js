import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = 'http://www.localhost:3000/api/dripples/';

class Dripples extends Component {
    render() {
        return (
            <div>
                <Dripple allDripples={ this.props.allDripples }/>
            </div>
        )
    }
}

class Dripple extends Component {
    constructor() {
        super();
        this.state = {
            featured_id: null,
            featured: false
        }
        this._handleClick = this._handleClick.bind( this );
    }

    saveEdit(title, content, dripple_id) {
        console.log(title, content, dripple_id)
        axios.put(`${SERVER_URL}${dripple_id}.json`, {title: title, content: content, id: dripple_id}).then((response) => {
            console.log(response);
            // this.setState({ dripples: [...this.state.dripples, response.data] })
        })
    }

    _handleClick(i) {
        this.setState({featured_id: i, featured: !this.state.featured})
        console.log(this.state);
        console.log('this should zoom into clicked dripple', i)
        console.log('display dripple\'s text')
    }

    render() {
        const { featured_id, featured } = this.state;
        let controlOptions;
        if (featured) {
            controlOptions = (
                <div>
                    <EditDripple drippleId={ featured_id } onSubmit={ this.saveEdit } />
                    <DeleteDripple drippleId={ featured_id } onSubmit={ this.saveDelete } />
                    <ConnectDripple drippleId={ featured_id } onSubmit={ this._handleConnect } />
                </div>
            )
        }
        return (
            <div>
                { console.log(this.props)}
                {/* map() dripples from database into divs className=dripple, give unique key and handleclick with i (check tictactoe) */}
                {/* {this.state.dripple.map(
                    (dp) => <div key={dp.id} onClick={() => this._handleClick(dp.id)}>
                                Dripple {dp.id}
                            </div>
                )} */}
                {/* map() this.props.dripple? for re-rendering new dripples */}
                {this.props.allDripples.map((dp) => 
                    <div className="dripple" key={dp.id}>
                        <div key={dp.id} onClick={() => this._handleClick(dp.id)}>
                                {dp.title} {dp.content}
                        </div>
                        {dp.id === featured_id ? controlOptions : null}
                    </div>
                )}
            </div>
        )
    }
}

class EditDripple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            id: this.props.drippleId
        }
        this._handleSubmit = this._handleSubmit.bind( this );
        this._handleTitle = this._handleTitle.bind( this );
        this._handleContent = this._handleContent.bind( this );
    }


    _handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.title, this.state.content, this.state.id)
        this.setState({ title: '', content: '' });
    }

    _handleTitle(event) {
        this.setState({ title: event.target.value })
    }

    _handleContent(event) {
        this.setState({ content: event.target.value })
    }

    render() {
        return (
            <div>
                <form onSubmit={ this._handleSubmit }>
                    <textarea onChange={ this._handleTitle } value={ this.state.title }></textarea>
                    <textarea onChange={ this._handleContent } value={ this.state.content }></textarea>
                    <button type="submit">Update</button>
                </form>
                { console.log(this.props.drippleId)}
            </div>
        )
    }
}

class DeleteDripple extends Component {
    render() {
        return (
            <div>
                <p>Button to remove Dripple</p>
                { console.log(this.props.drippleId)}

            </div>
        )
    }
}

class ConnectDripple extends Component {
    render() {
        return (
            <div>
                <p>should be a component that renders a filter form</p>
                <p>user selects filter options and clicks on search</p>
                <p>
                    match dripple with a dripple from another user that has similar matches
                </p>
                <p>
                    this should remove all dripples in current state and fill with new dripples from multiple users
                </p>
                { console.log(this.props.drippleId)}

            </div>
        )
    }
}

export default Dripples;