import React, { Component } from 'react';
import { NavLink, useLocation } from "react-router-dom"
import TurboLogo from '../img/turbo.svg'

class Navbar extends Component {
           
    state = {
        isLoading: true,
    }

    async componentDidMount(){ 
        const locations = {
            "Home": "/home",
            "About": "/about",
            "Archive": "/archive"
        }
    
        this.setState({
            isLoading: false,
            locations,
            activeLocation: "Home"
        })
    }

    render() {
        return ( 
        <>
            {this.state.isLoading ? <>Loading</> : 
                <div className="navbar">
                    <div className="logoContainer"><img src={TurboLogo} className="logo" alt="Turbo AF Logo" /></div>
                    <ul className="navButtons">
                        {Object.keys(this.state.locations).map((location) =>
                            <NavLink className="no_link" to={this.state.locations[location]}>
                                <li><div>{location}</div></li>
                            </NavLink>
                        )}
                    </ul>
                </div>
            }
        </>
        );
    }
}
 
export default Navbar;