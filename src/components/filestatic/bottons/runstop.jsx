import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios'

class Runstop extends Component {
    constructor(){
        super()
        this.state={
            modalconfig:false,
            confirm:false
        }
        this.modalconfig = this.modalconfig.bind(this)
        this.confirmpassword = this.confirmpassword.bind(this)
        this.changestade = this.changestade.bind(this)
    }
    confirmpassword(e){
        this.setState({ confirmpassword: e.target.value })
    }
    changestade(){
        if(!this.state.confirmpassword){
            this.setState({ confirm:true })
            setTimeout(()=>{ this.setState({ confirm:false }) },3000)
            return null
        }
        axios.put('/updatedstade',{
            user: localStorage.getItem('user'),
            passwordU: this.state.confirmpassword,
            stade:this.props.stade,
            userupdate:this.props.user
        },{
            headers: { token: localStorage.getItem('token') }
        })
        .then(resultacc=>{
            window.location.reload()
        })
        .catch( err=>console.log(err) )
    }
    modalconfig(){
        if(this.state.modalconfirm===true){
            return this.setState({ 
                modalconfirm: !this.state.modalconfirm,
                confirmpassword:false
            })
        }
        this.setState({ modalconfig: !this.state.modalconfig })
    }
    render() {
        return (
            <button onClick={this.modalconfig} className="bg-green hover:bg-grey text-white font-bold py-2 px-4 rounded">
                    {this.props.stade!=='active' 
                    ? <img src="/icons/play.svg" className=" w-5 h-5" alt="img run" /> 
                    : <img src="/icons/pausa.svg" className=" w-5 h-5" alt="img stop" />}
                <Modal isOpen={this.state.modalconfig} toggle={this.modalconfig}>
                <ModalHeader toggle={this.modalconfig}>Confirm</ModalHeader>
                    <ModalBody>
                        <div className="flex w-full">
                        <input type="password" onChange={this.confirmpassword} name="confirmpassword" placeholder="Password" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-3/5 py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" />
                        <button onClick={this.changestade} className="flex-1 bg-green hover:bg-green-darkest text-white font-bold py-2 px-4 rounded">Confirm</button>
                        </div>
                        <div className="w-full text-center text-red m-2">{ this.state.confirm ? 'password needs to be confirmed' : null }</div>
                    </ModalBody>
                </Modal>
            </button>
        );
    }
}

export default Runstop;