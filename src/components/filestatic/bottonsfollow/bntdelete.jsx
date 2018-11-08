import React, { Component } from 'react';
import axios from 'axios'
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
class Bntdelete extends Component {
    constructor(){
        super()
        this.state={
            modalfolllowd:false
        }
        this.modaldeletefollow = this.modaldeletefollow.bind(this)
        this.passwordDFollow = this.passwordDFollow.bind(this)
        this.deletefollow = this.deletefollow.bind(this)
    }
    modaldeletefollow(){
        if(this.state.modaldel===true){
            return this.setState({ 
                modalfolllowd: !this.state.modaldel,
                passworfd:null
            })
        }
        this.setState({ modalfolllowd: !this.state.modalfolllowd })
    }
    passwordDFollow(e){
        this.setState({ passworfd: e.target.value })
    }
    deletefollow(){
        if(!this.state.passworfd){
            this.setState({ confirm:'password needs to be confirmed' })
            setTimeout(()=>{ this.setState({ confirm:false }) },3000)
            return null
        }
        axios.post('/deletefollowuser',{
            user: localStorage.getItem('user'),
            passwordU: this.state.passworfd,
            usertodelete: this.props.id
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
            <button onClick={this.modaldeletefollow} className="bg-blue mx-1 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
                Delete
            <Modal isOpen={this.state.modalfolllowd} toggle={this.modaldeletefollow}>
                <ModalHeader toggle={this.modaldeletefollow}>Delete Follow</ModalHeader>
                <ModalBody>
                        <div className="flex w-full">
                        <input type="password" onChange={this.passwordDFollow} name="confirmpassword" placeholder="Password" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-3/5 py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" />
                        <button onClick={this.deletefollow} className="flex-1 bg-green hover:bg-green-darkest text-white font-bold py-2 px-4 rounded">Confirm</button>
                        </div>
                        <div className="w-full text-center text-red m-2">{ this.state.confirm ? this.state.confirm : null }</div>
                        <div className="w-full text-center text-green m-2">{ this.state.confirm2 ? this.state.confirm2 : null }</div>
                </ModalBody>
            </Modal>
            </button>
        );
    }
}

export default Bntdelete;