import React, { Component } from 'react';

class PlaylistViewer extends Component {
           
    state = {
        isLoading: true,
        playlists: [
            {
                name: 'Weekly',
                id: '27KQZuHHIJIXdSIdX5gwNr'
            },
            {
                name: 'Shuffle',
                id: '1i2GbaKB09GSgTzmiMFHqs'
            },
            {
                name: 'Forever',
                id: '5GGM872Q1jVXktaEOQxmp7'
            }
        ]
    }

    async componentDidMount(){
        
        let activeTab = this.state.playlists[0].id

        this.setState({
            isLoading: false,
            activeTab
        })
    }

    activateTab(playlistId) {
        this.setState({
            activeTab: playlistId
        })
    }

    getActive(className, playlistId){
        if (this.state.activeTab == playlistId){
            return className+" active"
        } else {
            return className
        }
    }

    render() {
        return (
            <div className="playlistViewer">
                <div className="tabs">
                {this.state.playlists.map((playlist) =>
                    <div className={this.getActive("tab", playlist.id)} key={playlist.id} onClick={
                        () => this.activateTab(playlist.id)
                    }>{playlist.name}</div>  
                )}
                </div>
                <div className="content">
                {this.state.playlists.map((playlist) =>
                    <iframe className={this.getActive("", playlist.id)} key={playlist.id} src={"https://open.spotify.com/embed/playlist/"+playlist.id+"?utm_source=generator&theme=0"} width="100%" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                )}
                </div>
            </div>
        );
    }
}
 
export default PlaylistViewer;