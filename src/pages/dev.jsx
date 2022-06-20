import React, { Component } from 'react';

class Dev extends Component {
           
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
                <div>dev</div>
            }
        </>
        );
    }
}
 
export default Dev;