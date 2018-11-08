import React, { Component } from 'react';
import axios from 'axios'
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
//component 
import Infofollow from './infofollow'
class CollapsU extends Component {
    constructor(){
        super()
        this.state={
            follows:null,
            modalfollow:false
        }
        this.addFollow = this.addFollow.bind(this)
        this.dataf = this.dataf.bind(this)
        this.addfowllownew = this.addfowllownew.bind(this)
    }
    addfowllownew(){
        if(!this.state.userfollow || !this.state.weight || !this.state.passwordf || !this.state.delayvote){
            this.setState({ msserrempy:'some fields are empty' })
            setTimeout(()=>{ this.setState({ msserrempy:null }) },2000)
            return null
        }
        axios.post('/newfollow',{
            user: localStorage.getItem('user'),
            passwordU: this.state.passwordf,
            follow:  this.state.userfollow,
            weight: this.state.weight,
            onw: this.props.user,
            delay: this.state.delayvote
        },{
            headers: { token: localStorage.getItem('token') }
        })
        .then(result=>{
            window.location.reload()
        })
        .catch(err=> window.location.reload() )
    }
    addFollow(){
        this.setState({ modalfollow:!this.state.modalfollow })
    }
    dataf(e){
        if(e.target.name==='weight' && e.target.value){
            if(e.target.value>100 && e.target.value!==0)
            {
                this.setState({ mssweight:'remember that the max weight is 100' })
                setTimeout(()=>{
                    this.setState({ mssweight:null })
                },2000)
            }
            if(e.target.value<1 && e.target.value!==0){
                this.setState({ mssweight:'remember that the min weight is 1' })
                setTimeout(()=>{
                    this.setState({ mssweight:null })
                },2000)
            }
        }
        this.setState({ [e.target.name]:e.target.value })
    }
    componentWillMount(){
        axios.post('/getfollows',{
            user: localStorage.getItem('user'),
            account: this.props.user
        },{
            headers: { token: localStorage.getItem('token') }
        })
        .then(result=>{
            var stateBntFollowadd=(
                result.data.account.length===3 && this.props.typeaccount==='free' ? false :
                result.data.account.length===10 && this.props.typeaccount==='premium' ? false : true
            )
            this.setState({
                followsaccountsU:result.data.account,
                buttonaddfollow : stateBntFollowadd
            })
        })
        .catch(err=> console.log(err))
    }
    render() {
        return (
            <div>
                {this.state.buttonaddfollow ? 
                <button onClick={this.addFollow} className="bg-transparent rounded border-black">
                    <img src="/icons/add.svg" alt="img add new account" className="h-5 w-5" />
                </button>
                : null}
                <Modal isOpen={this.state.modalfollow} toggle={this.addFollow}>
                    <ModalHeader toggle={this.addFollow}>Follow Account</ModalHeader>
                    <ModalBody>
                        <div className="content-between w-full max-w">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                        Username
                                    </label>
                                </div>
                                <div className="md:w-full">
                                    <input onChange={this.dataf} name="userfollow" placeholder="Username" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="text" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                        Weight
                                    </label>
                                </div>
                                <div className="md:w-full">
                                    <input onChange={this.dataf} name="weight" placeholder="1 - 100" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="number" min="1" max="100" />
                                </div>
                            </div>
                            { this.state.mssweight!==null ? <div className="md:items-center text-center text-red-dark mb-6">{this.state.mssweight}</div> : null }
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                        Delay
                                    </label>
                                </div>
                                <div className="md:w-full">
                                    <input onChange={this.dataf} name="delayvote" placeholder="Time in seconds" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="number" min="1" max="100" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                        Password
                                    </label>
                                </div>
                                <div className="md:w-full">
                                    <input onChange={this.dataf} name="passwordf" placeholder="passowrd" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="password" />
                                </div>
                            </div>
                            <button onClick={this.addfowllownew} className="w-full justify-center shadow bg-green-dark hover:bg-green focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                Follow
                            </button>
                            { this.state.msserrempy!==null ? <div className="md:items-center text-center text-red-dark mb-6">{this.state.msserrempy}</div> : null }
                            </div>
                    </ModalBody>
                </Modal>
                <div className="overflow-scroll lg:overflow-hidden">
                    <table className="w-full mt-1" >
                        <thead >
                            <tr className="border-2 border-blue bg-blue-light">
                                <th className="text-left">Account</th>
                                <th className="text-left">Follow</th>
                                <th className="text-left">Stade</th>
                                <th className="text-left">Delay</th>
                                <th className="text-left">Porcent</th>
                                <th className="text-center">Configs</th>
                            </tr>
                        </thead>
                        <tbody>
                        {!this.state.followsaccountsU ?
                        <tr>
                            <td colSpan="4">{'loading...'}</td>
                        </tr> : 
                        this.state.followsaccountsU.map(
                            (account,key)=>{ return <Infofollow infoaccountfollow={account} key={key} />}
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CollapsU;