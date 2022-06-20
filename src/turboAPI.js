const axios = require('axios')

const APIhostname = 'https://turboaf.net:5039/api'

export async function getThumbnail(date){
    const result = await axios({
        method: 'get',
        url: APIhostname+'/playlists/'+date+'/thumbnail',
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function getPlaylist(date){
    const result = await axios({
        method: 'get',
        url: APIhostname+'/playlists/'+date,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function getPlaylists(){

    const result = await axios({
        method: 'get',
        url: APIhostname+'/playlists',
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function getSeasons(){

    const result = await axios({
        method: 'get',
        url: APIhostname+'/playlists/seasons',
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function getUser(userID){
    const result = await axios({
        method: 'get',
        url: APIhostname+'/users/'+userID,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function getPlaylistData(playlistID){

    const result = await axios({
        method: 'get',
        url: APIhostname+'/playlists/spotify/'+playlistID,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function changeVote(trackID, mode){
    const result = await axios({
        method: 'put',
        url: APIhostname+'/tracks/votes',
        headers: {"Access-Control-Allow-Origin": "*"},
        data: {
            trackID: trackID,
            mode: mode
        }
    }).catch( err => {
        console.log(err);
    });
}

export async function getEvents(){

    const result = await axios({
        method: 'get',
        url: APIhostname+'/events',
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function submitSanta(obj){
    const result = await axios({
        method: 'put',
        url: APIhostname+'/events/santas',
        headers: {"Access-Control-Allow-Origin": "*"},
        data: {
            santaObj: JSON.stringify(obj),
        }
    }).catch( err => {
        console.log(err);
    });
}

export async function getLeaderboard(season = undefined){

    const url =  `${APIhostname}/leaderboard2/users${season === undefined ? '' : `/${season}`}`
    console.log(url);

    const result = await axios({
        method: 'get',
        url: url,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    return result.data
}