import React, { Component } from 'react';
import axios from 'axios';
import SideNavBar from './SideNavBar';
import Dripples from './Dripples';


const SERVER_URL = '';

class DropSpace extends Component {
    constructor() {
        super();
        this.state = {
            dripples: [
                {text:'I am a dripple', id:1},
                {text:'I am a dripple', id:2},
                {text:'I am a dripple', id:3}
            ]
        }
        // IMPORTANT
        // this should fetch initial dripples
        // get request
        // const fetchDripples = () => {
        //     axios.get(SERVER_URL).then((results) => {
        //         this.setState({dripple: results.data});
        //         // No need for recursively fetchDripples as this will automatically fetch each time a new Dripple is made by self user.
        //     })
        // }
        // fetchDripples();


        this.saveDripple = this.saveDripple.bind( this );
    }

    /* ALL OF THIS IS DUPLICATE, might remove ///////////////////////////////////////////////
    // constructor() {
    //     super();
    //     this.state = {
    //         // Get each dripple content here
    //         dripple: [
    //             {text:'I am a dripple1', id:1},
    //             {text:'I am a dripple2', id:2},
    //             {text:'I am a dripple3', id:3}
    //         ]
    //     }
    //     // const fetchDripples = () => {
    //     //     axios.get(SERVER_URL).then((results) => {
    //     //         this.setState({dripple: results.data});
    //     //         // No need for recursively fetchDripples as this will automatically fetch each time a new Dripple is made by self user.
    //     //     })
    //     // }
    //     // fetchDripples();
    // }
    /////////////////////////////////////////////////////////////////////////////////////*/ 

    saveDripple(text, id) {
        this.setState({ dripples: [...this.state.dripples, {text: text, id: id}] })

        console.log('post request', text, id);

        // axios.post(SERVER_URL, {tableColumnDataName: content}).then((response) => {

        // })

        // To re render new dripple. Need to save this to state then pass it down to Dripples component? 

        // to re-render dripples component
        // this.setState({ state.content: [... this.state.content, result.data] })
    }

    render() {
        return (
            <div className="body">
                <SideNavBar />
                <div className="content">
                    <Dripples newDrippleOrAllDripplesQuestionMark={ this.state.dripples }/>
                    <CreateDrop onSubmit={ this.saveDripple }/>
                </div>
            </div>
        )
    }
}

class CreateDrop extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            id: 0 // IMPORTANT, WONT HAVE TO PASSED MANUALLY, taken from database
        }
        this._handleSubmit = this._handleSubmit.bind( this );
        this._handleText = this._handleText.bind( this );
    }

    _handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.text, this.state.id);
        this.setState({ text: '', id: 0 });
    }

    // Need to save the value inside textarea to state, so that submit button can take this.state values as parameters when calling parent function
    _handleText(event) {
        this.setState({ text: event.target.value, id: 10 })
    }

    render () {
        return (
            <form onSubmit={ this._handleSubmit } >
                <textarea onChange={ this._handleText }></textarea>
                <input type="submit" value="Save" />
                {/* when onClick, post to database */}
                {/* then fetch dripples from Dripple component*/}
                {/* maybe when fetch new dripple, add new dripple into state with previously populated dripples */}
            </form>
        )
    }
}

export default DropSpace;