import React, { Component } from 'react';
import SideNavBar from './SideNavBar';


class Profile extends Component {
    render() {
        return (
            <div className="body">
                <SideNavBar />
                <div className="content">
                    Profile coming soon
                </div>
            </div>
        )
    }
}

export default Profile;