import React, { Component } from 'react';
import { BsSpotify } from 'react-icons/bs';
import { useParams } from "react-router-dom";
import { getPlaylist } from '../API/turboAPI';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class PlaylistViewer extends Component {
           
    state = {
        isLoading: true
    }

    async componentDidMount(){ 
        
        const playlistDate = this.props.params.playlistDate
        const playlist = await getPlaylist(playlistDate)

        this.setState({
            isLoading: false,
            playlist
        })
    }

    render() {
        return ( 
        <>
            {this.state.isLoading ? <>Loading</> : 
                <div className='defaultFlow playlist'>
                    {this.state.playlist.map((track) =>
                        <div className='item'>
                            <div className="art">
                                <a href={track.href} target="none" className='no_link'>
                                    <div className="cover">
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