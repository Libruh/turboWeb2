import React, { Component } from 'react';
import { getPlaylists } from '../API/turboAPI';

// Components
import PlaylistViewer from '../components/PlaylistViewer';
import LeaderboardViewer from '../components/LeaderboardViewer';

const datejs = require('datejs')

class Home extends Component {
           
    state = {
        isLoading: true
    }

    playlistLinks = []

    async componentDidMount(){
        
        this.setState({
            isLoading: false
        })
    }

    render() {
        return (
            <div className = "homepage">
                <div className="content">
                    <div className="pageContent">
                        <PlaylistViewer />
                        <LeaderboardViewer />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Home;