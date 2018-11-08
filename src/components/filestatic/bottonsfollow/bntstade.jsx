import React, { Component } from 'react';
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios'
class Bntstade extends Component {
    constructor(){
        super()
        this.state={
            modalfolllows:false
        }
        this.modalStadeFollow = this.modalStadeFollow.bind(this)
        this.passwordstadefollow = this.passwordstadefollow.bind(this)
        this.stadefolow = this.stadefolow.bind(this)
    }
    modalStadeFollow(){
        if(this.state.modalfolllows===true){
            return this.setState({
                modalfolllows: !this.state.modalfolllows,
                passwordstadef:null
            })
        }
        this.setState({ modalfolllows: !this.state.modalfolllows })
    }
    passwordstadefollow(e){
        this.setState({ passwordstadef:e.target.value  })
    }
    stadefolow(){
        if(!this.state.passwordstadef){
            this.setState({ confirm:'password needs to be confirmed' })
            setTimeout(()=>{ this.setState({ confirm:false }) },3000)
            return null
        }
        axios.post('/changestadefollow',{
            user: localStorage.getItem('user'),
            passwordU: this.state.passwordstadef,
            usertodelete: this.props.id,
            stade: this.props.stade
        },{
            headers: { token: localStorage.getItem('token') }
        })
        .then(resultacc=>{
            if(resultacc.data.ok===false){
                this.setState({ confirm:resultacc.data.mss })
                setTimeout(()=>{ this.setState({ confirm:false }) },3000)
                return null
            }
            this.setState({ confirm2:resultacc.data.mss })
            setTimeout(()=>{  window.location.reload() } ,1500)
        })
        .catch( err=>console.log(err) )
    }
    render() {
        return (
            <button onClick={this.modalStadeFollow} className="bg-blue mx-1 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
                Stade
            <Modal isOpen={this.state.modalfolllows} toggle={this.modalStadeFollow}>
                <ModalHeader toggle={this.modalStadeFollow}>Change Stade</ModalHeader>
                <ModalBody>
                <div className="flex w-full">
                        <input type="password" onChange={this.passwordstadefollow} name="confirmpassword" placeholder="Password" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-3/5 py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" />
                        <button onClick={this.stadefolow} className="flex-1 bg-green hover:bg-green-darkest text-white font-bold py-2 px-4 rounded">Confirm</button>
                        </div>
                        <div className="w-full text-center text-red m-2">{ this.state.confirm ? this.state.confirm : null }</div>
                        <div className="w-full text-center text-green m-2">{ this.state.confirm2 ? this.state.confirm2 : null }</div>
                </ModalBody>
            </Modal>
            </button>
        );
    }
}

export default Bntstade;