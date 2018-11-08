import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Accountsfile from './filestatic/accountsfile'

import '../css/mycss.css'

class Apppage extends Component {
    constructor(){
        super()
        this.state={
            stateUser:true
        }
    }
    componentWillMount() {
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("user");
        if(!token || !user){
            return this.setState({ stateUser:false })
        }
    }
    render() {
        return (
            <div className="flex xl:mx-32 sm:mx-4 justify-between">
                {this.state.stateUser ? <Access /> : <Redirect to={"/" }/> } 
            </div>
        );
    }
}

class Access extends Component {
    constructor(){
        super()
        this.state={
            modalAcc:false
        }
        this.addaccount = this.addaccount.bind(this)
        this.modalAddaccount = this.modalAddaccount.bind(this)
        this.handlechange = this.handlechange.bind(this)
    }
    
    componentWillMount() {
        axios.post('/accounts',{ 
            user: localStorage.getItem('user')
        },{ 
            headers: { token: localStorage.getItem('token') }
        })
        .then((result)=>{
            this.setState({ infoaccount:result.data.account })
        })
        .catch(err=>{ console.log(err) })
    }
    modalAddaccount(){
        this.setState({
            modalAcc:!this.state.modalAcc
        })
    }
    handlechange(e){
        this.setState({ [e.target.name]:e.target.value })
    }
    addaccount(){
        let { password,keyPosting,account } = this.state 
        if(!password || !keyPosting || !account){
            this.setState({ msserr:true })
            setTimeout(() => {
                this.setState({ msserr:false })
            }, 3000);
            return null
        }
        axios.post('/newaccount',{
            user: localStorage.getItem('user'),
            posting: this.state.keyPosting,
            account: this.state.account,
            passwordU: this.state.password
        },{
            headers: { token: localStorage.getItem('token') }
        })
        .then(result=>{
            if(result.data.ok===false){
                return console.log(result);
            }
            window.location.reload()
        })
        .catch(err=> console.log(err))
    }
    render() {
        return (
            <div className="mt-2 w-full">
                <div>
                    <Button className="bg-transparent rounded border-black" onClick={this.modalAddaccount}>
                        <img src="/icons/add.svg" alt="img add new account" className="h-5 w-5" />
                    </Button>
                    <Modal isOpen={this.state.modalAcc} toggle={this.modalAddaccount}>
                        <ModalHeader toggle={this.modalAddaccount}>Add New Account</ModalHeader>
                        <ModalBody>
                        <form className="content-between w-full max-w">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-48">
                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Account:
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input name="account" onChange={this.handlechange} className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="text"  placeholder="Account" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-48">
                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Key posting:
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input name="keyPosting" onChange={this.handlechange} className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="password" placeholder="Key Posting" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-48">
                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Password:
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input name="password" onChange={this.handlechange} className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="password" placeholder="password" />
                            </div>
                        </div>
                        <div className="w-full md:flex md:items-center justify-center">
                            {this.state.msserr ? <Msserr /> : null}
                        </div>
                        <div className="w-full md:flex md:items-center justify-center">
                            <button onClick={this.addaccount.bind(this)} className="shadow bg-green-dark hover:bg-green focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                Add Account
                            </button>
                        </div>
                        
                        </form>
                        </ModalBody>
                    </Modal>
                </div>
                <div className="w-full menuxuser">
                    {this.state.infoaccount ? this.state.infoaccount.map(accountm=>{ 
                        return <Accountsfile key={accountm._id} data={accountm} />
                    })
                    : <span className=" text-center">Loading...</span>}
                </div>
            </div>
        );
    }
}

const Msserr = ()=>{
    return (
        <div className="bg-red-lightest rounded text-center w-full text-red-dark mb-3 px-3 py-2" role="alert">
            <p>Some data have not been entered.</p>
        </div>
    )
}

export default Apppage;