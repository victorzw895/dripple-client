import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import axios from 'axios';

const SERVER_URL = '';

class Dripples extends Component {
    render() {
        return (
            <div>
                <Dripple dripple={ this.props.newDrippleOrAllDripplesQuestionMark }/>
                {/* this link below should be renamed to use different component. */}
                {/* should be a component that renders a filter form */}
                {/* user selects filter options and clicks on search */}
                {/* match dripple with a dripple from another user that has similar matches */}
                {/* this should remove all dripples in current state and fill with new dripples from multiple users */}
                <Link to="/search">Send Dripple</Link> 
            </div>
        )
    }
}

class Dripple extends Component {


    _handleClick(i) {
        console.log('this should zoom into clicked dripple', i)
        console.log('display dripple\'s text')
    }


    render() {
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
                {this.props.dripple.map(
                    (dp) => <div key={dp.id} onClick={() => this._handleClick(dp.id)}>
                                {dp.text} {dp.id}
                            </div>
                )}
            </div>
        )
    }
}

export default Dripples;