import React, { Component } from 'react';

class Archive extends Component {
           
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
                <div>archive</div>
            }
        </>
        );
    }
}
 
export default Archive;