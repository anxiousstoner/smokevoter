import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios'


class Updatekey extends Component {
    constructor(){
        super()
        this.state={
            Updatekey:false,
        }
        this.modalUpdatekey = this.modalUpdatekey.bind(this)
        this.keyupdated = this.keyupdated.bind(this)
        this.passwordaccountU = this.passwordaccountU.bind(this)
        this.updatedkey = this.updatedkey.bind(this)
    }
    modalUpdatekey(){
        if(this.state.Updatekey===true){
            return this.setState({ 
                Updatekey: !this.state.Updatekey,
                passwordaccount:null,
                keyupdate:null
            })
        }
        this.setState({ Updatekey: !this.state.Updatekey })
    }
    keyupdated(e){
        this.setState({ keyupdate: e.target.value })
    }
    passwordaccountU(e){
        this.setState({ passwordaccount: e.target.value })
    }
    updatedkey(){
        if(!this.state.passwordaccount || !this.state.keyupdate){
            this.setState({ confirm:'password or new key is empty' })
            setTimeout(()=>{ this.setState({ confirm:false }) },3000)
            return null
        }
        axios.post('/updatedkey',{
            user: localStorage.getItem('user'),
            passwordU: this.state.passwordaccount,
            userupdate: this.props.id,
            account:this.props.user,
            posting:this.state.keyupdate
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
            <button onClick={this.modalUpdatekey} className="ml-2 bg-green hover:bg-grey text-white font-bold py-2 px-4 rounded">
                Update Key
                <Modal isOpen={this.state.Updatekey} toggle={this.modalUpdatekey}>
                <ModalHeader toggle={this.modalUpdatekey}>Confirm</ModalHeader>
                    <ModalBody>
                        <form>
                        <div className="content-between w-full max-w">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                        New key
                                    </label>
                                </div>
                                <div className="md:w-full">
                                    <input onChange={this.keyupdated} className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="text"  placeholder="New Key" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                        Password
                                    </label>
                                </div>
                                <div className="md:w-full">
                                    <input onChange={this.passwordaccountU} className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="password" placeholder="password" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center justify-center">
                                <button onClick={this.updatedkey} className="shadow bg-green-dark hover:bg-green focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                    Update Key
                                </button>
                            </div>
                        </div>
                        <div className="w-full text-center text-red m-2">{ this.state.confirm ? this.state.confirm : null }</div>
                        <div className="w-full text-center text-green m-2">{ this.state.confirm2 ? this.state.confirm2 : null }</div>
                        </form>
                    </ModalBody>
                </Modal>
            </button>
        );
    }
}
export default Updatekey;

