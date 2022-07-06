import React, { Component } from 'react';
import { getUsers } from '../API/turboAPI';
import { FaDiscord } from 'react-icons/fa';
import { RiCodeSSlashLine } from 'react-icons/ri'


const iconDict = {
    'code': <RiCodeSSlashLine size="1.2em"/>,
    'invite': <FaDiscord size="1.2em"/>
}

class BotPreview extends Component {
           
    state = {
    }

    async componentDidMount(){
    }

    render() {
        return (<>
            {this.props.isLoading ? 
                <div className="botPreview placeholder">
                    <div className="profile">
                        <div className="placeholder-img"></div>
                        <div className='info'>
                            <div className="name"></div>
                            <div className='description'></div>
                        </div>
                    </div>
                    {this.props.data.buttons !== undefined ? <>
                        <div className='buttons'>
                            {Object.keys(this.props.data.buttons).map( buttonName =>
                                <a>
                                    <div>
                                    </div>
                                </a>
                            )}
                        </div>
                    </> : <></>}
                </div> 
            : 
                <div className={"botPreview" + (this.props.isLoading ? ' hidden' : '')}>
                    <div className="profile">
                        <img src={this.props.data.discord.user.displayAvatarURL} alt="" />
                        <div className='info'>
                            <div className="name">{this.props.data.discord.nick}</div>
                            <div className='description'><span>{this.props.data.description}</span></div>
                        </div>
                    </div>
                    {this.props.data.buttons !== undefined ? <>
                        <div className='buttons'>
                            {Object.keys(this.props.data.buttons).map( buttonName =>
                            <a href={this.props.data.buttons[buttonName].url} target='none' className='no_link'>
                                <div style={{backgroundColor: this.props.data.buttons[buttonName].color}} key={buttonName}> 
                                    {buttonName.charAt(0).toUpperCase() + buttonName.slice(1)}
                                    {iconDict[buttonName] ? iconDict[buttonName] : '2'}
                                </div>
                            </a>
                                )}
                        </div>
                    </> : <></>}
                </div>
            }
        </>);
    }
}
    

export default BotPreview;