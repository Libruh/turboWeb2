import React, { Component } from 'react';

class About extends Component {
           
    state = {
        isLoading: true
    }

    async componentDidMount(){ 

        this.setState({
            isLoading: false
        })
    }

    render() {
        return ( 
        <>
            {this.state.isLoading ? <>Loading</> : 
                <div>about</div>
            }
        </>
        );
    }
}
 
export default About;