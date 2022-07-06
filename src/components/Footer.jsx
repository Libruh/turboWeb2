import React, { Component } from 'react';
import { FaGithubAlt, FaDiscord, FaReact } from 'react-icons/fa';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="madewith">
                    <a href="https://github.com/Libruh/turboWeb2" className="no_link" target="none">
                        <div>Made with</div> <FaReact size="1.2em"/>
                    </a>
                </div>
                <div className="madeby">
                    <a href="https://github.com/Libruh" className="no_link" target="none">
                        <div>Github</div> <FaGithubAlt size="1.2em"/>
                    </a>
                </div>
                <div className="joindiscord">
                    <a href="https://discord.gg/F4rTukm5ts" className="no_link" target="none">
                        <div>Discord</div> <FaDiscord size="1.2em"/>
                    </a>
                </div>
            </div>
        );
    }
}
 
export default Footer;