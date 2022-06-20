import React, { Component } from 'react';
import { getLeaderboard } from '../turboAPI';
import Crown from '../img/crown.svg'

class LeaderboardViewer extends Component {
           
    state = {
        isLoading: true
    }

    async componentDidMount(){

        function swapSpots(leaderboard){
            let firstPlace = leaderboard[0]
            leaderboard[0] = leaderboard[1]
            leaderboard[1] = firstPlace
            return leaderboard
        }
       
        let leaderboards = {}

        leaderboards['Season 3'] = await getLeaderboard(3)
        leaderboards['All Time'] = await getLeaderboard()

        swapSpots(leaderboards['Season 3'])
        swapSpots(leaderboards['All Time'])
        
        this.setState({
            isLoading: false,
            leaderboards,
            activeLeaderboard: "Season 3"
        })
    }

    activateTab(leaderboard) {
        this.setState({
            activeLeaderboard: leaderboard
        })
        console.log(this.state);
    }

    getActive(className, leaderboard){
        if (this.state.activeLeaderboard === leaderboard){
            return className+" active"
        } else {
            return className
        }
    }

    render() {
        return (
        <div className="leaderboardViewer">
            <div className='tabs'>
            {this.state.isLoading ? 
                <>
                    <div className="tab active placeholder" key="placeholder"></div>
                </> :
                <>
                {Object.keys(this.state.leaderboards).map((leaderboard) =>
                    <div className={this.getActive("tab", leaderboard)} key={leaderboard} onClick={
                        () => this.activateTab(leaderboard)
                    }>{leaderboard}</div>  
                )}
                </>
                }
            </div>
        {this.state.isLoading ? 
        <>
            {/* Loading Filler */}
            <div className="top3 loading">
                <div className='topUser'><div className='avatar'></div></div>
                <div className='topUser first'><div className='avatar'></div></div>
                <div className='topUser'><div className='avatar'></div></div>
            </div>
        </>
        :
        <>
            {/* AlltimeLeaderboard */}
            <div className="top3">
                {this.state.leaderboards[this.state.activeLeaderboard].slice(0,3).map((user, i) =>
                    <div className={`topUser ${i === 1 ? 'first' : null}`}>
                        {i === 1 ? <img src={Crown} className="crown" alt="crown"/> : null}
                        <img src={user['avatar']} className = "avatar" alt="" />
                        <span className="nick">{user['nick']}</span>
                        <span className="votes">{user['votes']}</span>
                    </div>
                )}
            </div>
            <div className="runnersUp">
                {this.state.leaderboards[this.state.activeLeaderboard].slice(3).map((user, i) =>
                    <div>
                        <img src={user['avatar']} className = "avatar" alt="" />
                        <span className="nick">{user['nick']}</span>
                        <span className="votes">{user['votes']}</span>
                    </div>
                )}
            </div>
        </>
        }
        </div>
        );
    }
}
 
export default LeaderboardViewer;