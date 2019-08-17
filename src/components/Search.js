import React, { Component } from 'react';
import SideNavBar from './SideNavBar';


class Search extends Component {
    render() {
        return (
            <div className="body">
                <SideNavBar />
                <div className="content">
                    Get connected with similar dripples coming soon
                    {/* View list of featured dripples */}
                    {/* need a like system? dripple grows the more it is liked? turns gold? */}
                    {/* show dripples according to categories, or tags. Maybe not by location */}
                </div>
            </div>
        )
    }
}

export default Search;