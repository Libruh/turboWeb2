import React, { Component } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getArchive } from '../API/turboAPI';
import { Image } from "@chakra-ui/image"

class Archive extends Component {
           
    state = {
        isLoading: true
    }

    async componentDidMount(){ 
        let archive = await getArchive()
        archive.reverse()
        archive.splice(1, 1)

        
        let lastYear = undefined
        
        for (let index = 0; index < archive.length; index++) {
            let playlistDate = archive[index].playlistDate
            let current = archive[index].current

            let startDate = new Date(playlistDate).add(1).day()
            let endDate = new Date(startDate).add(6).day()
            
            const dateFormat = "MMM d"
            
            archive[index]['label'] = `${startDate.toString(dateFormat)} - ${endDate.toString(dateFormat)}`
        
            if (playlistDate != undefined && !current){
                const year = parseInt(playlistDate.substring(0,4))
                if (year != lastYear){
                    lastYear = year
                    const obj = {
                        current: false,
                        divider: true,
                        year: year
                    }
                    archive.splice( index, 0, obj );
                    index++;
                }
            }

        }

        this.setState({
            isLoading: false,
            archive
        })
    }

    render() {

        return ( 
        <div className='archivePage'>
            {this.state.isLoading ? <>Loading</> : 
                <div className='archive'>
                    {this.state.archive.map((playlist) => <>
                        {playlist.current ?
                            <Link className='no_link' to={`/archive/${playlist.playlistDate}`}>
                                <div className='current'>
                                    <div className="mosaic">
                                        <div>
                                            {playlist.art.slice(0,12).map((art) => <img src={art}/>)}
                                            {playlist.art.slice(0,12).map((art) => <img src={art}/>)}
                                        </div>
                                        <div>
                                            {playlist.art.slice(12,24).map((art) => <img src={art}/>)}
                                            {playlist.art.slice(12,24).map((art) => <img src={art}/>)}
                                        </div>
                                        <div>
                                            {playlist.art.slice(24,36).map((art) => <img src={art}/>)}
                                            {playlist.art.slice(24,36).map((art) => <img src={art}/>)}
                                        </div>
                                        <div>
                                            {playlist.art.slice(36,48).map((art) => <img src={art}/>)}
                                            {playlist.art.slice(36,48).map((art) => <img src={art}/>)}
                                        </div>
                                    </div>
                                    <div className='cover'>
                                        <div className="name">
                                            <div> This Week </div>
                                        </div>
                                        <div className="description">
                                            See what contributors have been listening to this week
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            :
                            <>
                            {playlist.divider ?
                                <div className="divider">
                                    {playlist.year}
                                </div>
                                :
                                <div className="playlist">
                                    <Link className='no_link' to={`/archive/${playlist.playlistDate}`}>
                                        <Image 
                                            src={playlist.thumbnails.big}
                                            fallbackSrc={playlist.thumbnails.tiny}
                                        />
                                        <div className="date"><span>{playlist.label}</span></div>
                                    </Link>
                                </div>
                            }
                            </>
                        }
                    </> )}
                </div>
            }
        </div>
        );
    }
}
 
export default Archive;