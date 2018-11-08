import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios'
class Delete extends Component {
    constructor(props){
        super(props)
        this.state={
            modaldel:false,
            account: this.props.user,
            passworddel:null,
            confirm:false
        }
        this.modalconfirmdel = this.modalconfirmdel.bind(this)
        this.deleteaccount = this.deleteaccount.bind(this)
        this.passworddelete = this.passworddelete.bind(this)
    }
    passworddelete(e){
        this.setState({ passworddel: e.target.value })
    }
    modalconfirmdel(){
        if(this.state.modaldel===true){
            return this.setState({ 
                modaldel: !this.state.modaldel,
                passworddel:null
            })
        }
        this.setState({ modaldel: !this.state.modaldel })
    }
    deleteaccount(){
        if(!this.state.passworddel){
            this.setState({ confirm:'password needs to be confirmed' })
            setTimeout(()=>{ this.setState({ confirm:false }) },3000)
            return null
        }

        axios.post('/delaccount',{
            user: localStorage.getItem('user'),
            passwordU: this.state.passworddel,
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
            <button onClick={this.modalconfirmdel} className="ml-2 bg-green hover:bg-grey text-white font-bold py-2 px-4 rounded">
                <img src="/icons/delete.svg" className=" w-5 h-5" alt="img delete" />
                <Modal isOpen={this.state.modaldel} toggle={this.modalconfirmdel}>
                <ModalHeader toggle={this.modalconfirmdel}>Confirm</ModalHeader>
                    <ModalBody>
                        <div className="flex w-full">
                        <input type="password" onChange={this.passworddelete} name="confirmpassword" placeholder="Password" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-3/5 py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" />
                        <button onClick={this.deleteaccount} className="flex-1 bg-green hover:bg-green-darkest text-white font-bold py-2 px-4 rounded">Confirm</button>
                        </div>
                        <div className="w-full text-center text-red m-2">{ this.state.confirm ? this.state.confirm : null }</div>
                        <div className="w-full text-center text-green m-2">{ this.state.confirm2 ? this.state.confirm2 : null }</div>
                    </ModalBody>
                </Modal>
            </button>
        );
    }
}
export default Delete;