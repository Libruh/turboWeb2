import React, { Component } from 'react';
import asciiLogo from '../misc/asciiLogo.js'
import showcaseBots from '../misc/showcaseBots.json'
import BotPreview from '../components/BotPreview'
import { getUsers } from '../API/turboAPI'

const sleep = ms => new Promise(r => setTimeout(r, ms));

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

class Projects extends Component {
           
    state = {
        isLoading: true,
        childrenLoading: true,
        asciiLogo,
        showcaseBots
    }

    async componentDidMount() {

        this.animateLogo()

        const botData = await getUsers(Object.keys(showcaseBots))
        let loadStatus = {}
        for (const botId in showcaseBots) {
            loadStatus[botId] = false;
            showcaseBots[botId]["discord"] = botData[botId]
        }

        this.setState({
            isLoading: false,
            showcaseBots,
            loadStatus
        })

      }

    async animateLogo() {
        while (1) {

            let targetIndexes = [0, 0, 0, 0, 0]

            for (const i in targetIndexes) {
                while(asciiLogo.charAt(targetIndexes[i]) === "\n" || asciiLogo.charAt(targetIndexes[i]) === " "){
                    targetIndexes[i] = Math.floor(Math.random() * asciiLogo.length) + 1;
                }
            }

            let symbols = ["@", "$", "!", "*", "&", "%"]
            let symbolLists = []
            for (const i in targetIndexes) {
                const targetIndex = targetIndexes[i]
                let symbolList = shuffle(symbols.slice())
                symbolList.push(asciiLogo.charAt(targetIndex))
                symbolList.unshift(asciiLogo.charAt(targetIndex))
                symbolLists.push(symbolList)
            }

            // Loops through every time a character will need changed
            for (let i = 0; i < symbols.length+2; i++) {
                let newLogo = asciiLogo
                for (let y = 0; y < targetIndexes.length; y++) {
                    const targetIndex = targetIndexes[y]
                    const newChar = symbolLists[y][i]

                    newLogo = newLogo.substring(0,targetIndex) + newChar + newLogo.substring(targetIndex+1, newLogo.length)
                }

                try {
                    document.querySelector(".asciiLogo pre").innerHTML = newLogo;
                } catch (error) {
                    
                }

                await sleep(100)
            }
        }
    }

    render() {

        return (
        <>
             <div className='asciiLogo'>
                    <div className='preText'>
                        <pre>{this.state.asciiLogo}</pre>
                    </div>
                </div>
                <div className="projectsPage">
                    <div className="pageContent">
                        {Object.keys(this.state.showcaseBots).map( botId => 
                            <BotPreview key={botId} data={this.state.showcaseBots[botId]} isLoading={this.state.isLoading}/>
                        )}
                    </div>
                </div>
        </>
        );
    }
}
 
export default Projects;