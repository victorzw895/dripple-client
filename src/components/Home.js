import React, { Component } from 'react';
import SideNavBar from './SideNavBar';

class Home extends Component {
    render() {
        return (
            <div className="body">
                <SideNavBar />
                <div className="content">
                    Dripple Coming soon
                    Login Coming soon
                    Logout
                </div>
            </div>
        )
    }
}

export default Home;