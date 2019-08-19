import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SideNavBar from './SideNavBar';


const SERVER_URL = 'http://www.localhost:3000/api/dripples.json';
// const SERVER_URL = 'http://www.dripples.herokuapp.com/api/dripples.json';

class MoreDripples extends Component {
    constructor() {
        super();
        this.state = {
            dripple: [],
            featured_id: null,
            featured: false,
            isLoaded: false,
            dripples: [],
        }
        this.componentDidMount = this.componentDidMount.bind( this );
        this._handleClick = this._handleClick.bind( this );
    }

        
    componentDidMount() {
        //     // NEED TO FILTER results by similar tags and categories
        if (this.props.location.state === undefined) {
            this.props.history.push("/dropspace");
            return;
        }
        let token = "Bearer " + localStorage.getItem("jwt");
        axios({method: 'get', url: SERVER_URL, headers: {'Authorization': token}}).then(response => {
            console.log(response.data);
            console.log(this.props.location.state)
            const current_dripple = response.data.filter(dripple => dripple.id === Number(this.props.location.state))
            // const matches = response.data.filter
            this.setState({
                dripple: current_dripple,
                isLoaded: true,
                dripples: response.data
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    _handleClick(i) {
        const { featured_id, featured } = this.state
        if (featured_id === null && !featured) {
            this.setState({featured_id: i, featured: !featured})
        } else if (featured && featured_id === i ) {
            this.setState({featured_id: null, featured: !featured})
        }
        console.log(this.state);
        console.log('this should zoom into clicked dripple', i)
        console.log('display dripple\'s text')
    }

    render() {
        const { featured_id, featured, dripple } = this.state;
        console.log(dripple);
        let controlOptions;
        if (featured) {
            controlOptions = (
                <div>
                    <ConnectDripple drippleId={ featured_id } onSubmit={ this._handleConnect } />
                </div>
            )
        }
        return (
            <div>
                <div className="body">
                    <SideNavBar />
                    <div className="content">
                        {this.state.dripples.map((dp) => 
                            <div className="dripple" key={dp.id}>
                                <div key={dp.id} onClick={() => this._handleClick(dp.id)}>
                                        {dp.title} {dp.content}
                                </div>
                                {dp.id === featured_id ? controlOptions : null}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}


class ConnectDripple extends Component {
    render() {
        return (
            <div>
                 Get connected with similar dripples coming soon
                    {/* View list of featured dripples */}
                    {/* need a like system? dripple grows the more it is liked? turns gold? */}
                    {/* show dripples according to categories, or tags. Maybe not by location */}
                { console.log(this.props.drippleId)}

            </div>
        )
    }
}

export default MoreDripples;