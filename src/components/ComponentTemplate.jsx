import React, { Component } from 'react';

class MODULENAME extends Component {
           
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
                <div></div>
            }
        </>
        );
    }
}
 
export default MODULENAME;