import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class IndexSite extends Component {
    constructor(){
        super()
        this.state={
            loginstate:false
        }
    }
    componentWillMount() {
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("user");
        if(token && user){
            return this.setState({ stateUser:true })
        }
    }
    
    render() {
        if(this.state.stateUser){
            return (<Redirect to={"/app" }/>)
        }
        return (
            <div className="p-2 w-full">
                <div className="flex xl:mx-32 sm:mx-4 justify-between">
                prueba INDEX
                </div>
            </div>
        );
    }
}

export default IndexSite;