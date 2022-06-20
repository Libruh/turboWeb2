import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPlaylists } from '../turboAPI';

// Components
import PlaylistViewer from '../components/PlaylistViewer';
import LeaderboardViewer from '../components/LeaderboardViewer';

const datejs = require('datejs')

class HomePage extends Component {
           
    state = {
        isLoading: true
    }

    playlistLinks = []

    async componentDidMount(){
        const fetchedPlaylists = await getPlaylists()
        let archiveYear = ""

        for (const index in fetchedPlaylists) {
            let currentYear = fetchedPlaylists[index].substring(0,4)

            if(archiveYear !==  currentYear || parseInt(index) === fetchedPlaylists.length-1){
                if(archiveYear !== "" && parseInt(index) !== fetchedPlaylists.length-1){
                    this.playlistLinks.push(<div className="divider" key={"divider"+archiveYear}><span>{archiveYear}</span></div>)
                }
                archiveYear = fetchedPlaylists[index].substring(0,4)
            }

            const playlistDate = fetchedPlaylists[index]
            const linkTarget = "/music/"+playlistDate

            let startDate = new Date(playlistDate).add(1).day()
            let endDate = new Date(startDate).add(6).day()

            const dateFormat = "MMM d"
            let linkLabel = `${startDate.toString(dateFormat)} - ${endDate.toString(dateFormat)}`

            var now = new Date();

            if(endDate >= now){
                linkLabel = "This Week"
            }

            this.playlistLinks.push(
                <Link to={linkTarget} className="no_link" key={linkLabel}>
                    <div className="dateLink">
                        <div className="date">
                            <span className="startDate">{startDate.toString(dateFormat)}</span>
                            <span className="endDate">{endDate.toString(dateFormat)}</span>
                        </div>
                    </div>
                </Link>
            )

            if (parseInt(index) === fetchedPlaylists.length-1){
                this.playlistLinks.push(<div className="divider" key={"divider"+archiveYear}><span>{archiveYear}</span></div>)
            }

        }

        this.playlistLinks.reverse()    
        
        this.setState({
            isLoading: false
        })
    }

    render() {
        return (
            <div className = "homepage">
                <div className="content">
                    <div className="homeContent">
                        <PlaylistViewer />
                        <LeaderboardViewer />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default HomePage;