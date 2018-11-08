import React, { Component } from 'react';
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios'
class Bntporcent extends Component {
    constructor(){
        super()
        this.state={
            modalfolllowp:false
        }
        this.modalporcentfollow = this.modalporcentfollow.bind(this)
        this.changeconfigs = this.changeconfigs.bind(this)
        this.changeconfigsfinal = this.changeconfigsfinal.bind(this)
    }
    modalporcentfollow(){
        this.setState({ modalfolllowp: !this.state.modalfolllowp })
    }
    changeconfigs(e){
        this.setState({ [e.target.name]:e.target.value })
    }
    changeconfigsfinal(){
        if(!this.state.porcentnew || !this.state.delaynew || !this.state.passwordconf){
            this.setState({ confirm:'password or new key is empty' })
            setTimeout(()=>{ this.setState({ confirm:false }) },3000)
            return null
        }
        axios.post('/updatedconfigsfollow',{
            user: localStorage.getItem('user'),
            passwordU: this.state.passwordconf,
            userupdate: this.props.id,
            account:this.props.user,
            delay: this.state.delaynew,
            porcentnew:this.state.porcentnew
        },{
            headers: { token: localStorage.getItem('token') }
        })
        .then(resultacc=>{
            console.log(resultacc)
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
            <button onClick={this.modalporcentfollow} className="bg-blue mx-1 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
                Config
            <Modal isOpen={this.state.modalfolllowp} toggle={this.modalporcentfollow}>
                <ModalHeader toggle={this.modalporcentfollow}>Change Configs</ModalHeader>
                <ModalBody>
                    <div className="w-full flex">
                        <div className="w-full md:w-1/2 px-3 ">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                                Porcent
                            </label>
                            <input onChange={this.changeconfigs} name="porcentnew" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" min="1" max="100" placeholder="Porcent" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Delay
                            </label>
                            <input onChange={this.changeconfigs} name="delaynew" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" type="number" placeholder="Delay" />
                        </div>
                    </div>
                    <div className="w-full flex mb-2 px-3">
                        <input type="password" onChange={this.changeconfigs} name="passwordconf" placeholder="Password" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" />
                    </div>
                    <div className="w-full flex px-3">
                        <button onClick={this.changeconfigsfinal} className="flex-1 bg-green hover:bg-green-darkest text-white font-bold py-2 px-4 rounded">Confirm</button>
                    </div>
                    <div className="w-full text-center text-red m-2">{ this.state.confirm ? this.state.confirm : null }</div>
                    <div className="w-full text-center text-green m-2">{ this.state.confirm2 ? this.state.confirm2 : null }</div>
                </ModalBody>
            </Modal>
            </button>
        );
    }
}

export default Bntporcent;