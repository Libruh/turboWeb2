import React, { Component } from 'react';
import { BsSpotify } from 'react-icons/bs';
import { useParams } from "react-router-dom";
import { getPlaylist } from '../API/turboAPI';
import {TiArrowSortedUp, TiArrowSortedDown} from 'react-icons/ti'
import {FiClock, FiStar} from 'react-icons/fi'


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class PlaylistViewer extends Component {
           
    state = {
        isLoading: true
    }

    async componentDidMount(){ 
        const playlistDate = this.props.params.playlistDate
        const playlist = await getPlaylist(playlistDate, "date", "reverse")

        this.setState({
            isLoading: false,
            playlistDate,
            playlist,
            sort: "date",
            direction: "reverse",
            fetching: false
        })
    }

    async sortBy(sort){

        let direction = this.state.direction
        if (sort === this.state.sort) {
            switch (direction) {
                case "forward":
                    direction = "reverse"
                    break;

                case "reverse":
                    direction = "forward"
                    break;
            
                default:
                    direction = "reverse"
                    break;
            }
        } else {
            direction = "reverse"
        }

        this.setState({
            sort,
            direction,
            fetching: true
        })

        const newList = await getPlaylist(this.state.playlistDate, sort, direction)

        this.setState({
            playlist: newList,
            fetching: false
        })

        console.log("Direction is now "+this.state.direction);
    }

    render() {
        return ( 
        <>
            {this.state.isLoading ? <>Loading</> :
                <div className='defaultFlow playlistViewer'>
                    <div className="sortby">
                        <div className={"date "+(this.state.fetching ? "fetching" : "")} onClick={() => this.sortBy("date")}>
                            <FiClock size="1.6em"/>
                            {this.state.sort === "date" ? <>
                                <TiArrowSortedUp className="reverse" size="1.4em" style={this.state.direction === "reverse" ? {} : {display: "none"}} />
                                <TiArrowSortedDown className="forward" size="1.4em" style={this.state.direction === "forward" ? {} : {display: "none"}} />
                            </> : <></>}
                        </div>
                        <div className={"votes "+(this.state.fetching ? "fetching" : "")} onClick={() => this.sortBy("votes")}>
                            <FiStar size="1.6em"/>
                            {this.state.sort === "votes" ? <>
                                <TiArrowSortedUp className="reverse" size="1.4em" style={this.state.direction === "reverse" ? {} : {display: "none"}}/>
                                <TiArrowSortedDown className="forward" size="1.4em" style={this.state.direction === "forward" ? {} : {display: "none"}}/>
                            </> : <></>}
                        </div>
                    </div>
                    {this.state.playlist.map((track) =>
                        <div className={"item "+(this.state.fetching ? "fetching" : "")}>
                            <div className="art">
                                <a href={track.href} target="none" className='no_link'>
                                    <div className="spotifyCover">
                                        <BsSpotify className='icon'/>
                                    </div>
                                </a>
                                <img src={track.art[1].url} alt="" />
                            </div>
                            <div className="info">
                                <span className="title">{track.title}</span>
                                <span className="artist">{track.artists[0].name}</span>
                                <div className="contributor">
                                    <img src={track.addedBy.user.displayAvatarURL} alt="" />
                                    <span className="nick">{track.addedBy.nick}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
        );
    }
}
 
export default withParams(PlaylistViewer);