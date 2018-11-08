import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Loading extends Component {
    constructor(){
        super()
        this.state={
            loading:false
        }
    }
    componentDidMount() {
        setTimeout(() => { 
            this.setState({ loading:true })
        }, 3500);
    }
    render() {
            if(this.state.loading){
                return <Redirect to="/" />
            }
            return (
            <div className="flex flex-wrap h-screen max-h-screen-3/4">
                <div className="w-1/3 p-2 mt-32 mx-auto md:mt-32 sm:mt-32 lg:mt-32 xl:m-32">
                    <div className="text-grey-darker text-center p-2 m-auto">
                        <img className="h-8" src="/icons/loading.svg" alt="img loading" />
                        <br />
                        <span className="text-3xl">Loading...</span>
                    </div>
                </div>
            </div>
    );
    }
}

export default Loading;