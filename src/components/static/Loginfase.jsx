import React, { Component } from 'react';
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
//dependencies
import axios from 'axios'
//css
import '../../css/tailwind.css'

class Loginfase extends Component {
    constructor() {
        super();
        this.state = {
            modallogin: false,
            modalSignup:false,
        };
    
        this.togglelogin = this.togglelogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }
    
    login() {
        axios.post('/login', {
            username: this.state.usernamelo,
            password: this.state.passwordlo
          })
          .then(function (response) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.user);
            window.location.href="/loading";
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    register(){
        axios.post('/register', {
            username: this.state.usernamereg,
            password: this.state.passwordreg,
            email: this.state.emailreg
          })
          .then((response)=>{
            if(response.data.ok){
                return axios.post('/login', {
                    username: this.state.usernamereg,
                    password: this.state.passwordreg
                  })
            }
          })
          .then((result)=>{
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("user", result.data.user);
            window.location.href="/loading";
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    updateData(e){
        this.setState({ [e.target.name]:e.target.value })
    }
    togglelogin() {
        this.setState({
            modallogin: !this.state.modallogin
        });
    }
    toggleSignup() {
        this.setState({
            modalSignup: !this.state.modalSignup
        });
    }
    render() {
        return (
            <div className="mt-auto mb-auto ml-auto"> 
                <button onClick={this.togglelogin} className="bg-green m-1 hover:bg-green-darkest text-white font-bold py-1 px-3 rounded">
                    LOGIN
                </button>
                <Modal isOpen={this.state.modallogin} toggle={this.togglelogin} >
                    <ModalHeader toggle={this.togglelogin}>
                        LOGIN
                    </ModalHeader>
                    <ModalBody >
                        <form className="content-between w-full max-w">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Username
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input name="usernamelo" onChange={this.updateData.bind(this)} className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="text"  placeholder="Userme" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Password
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input name="passwordlo" onChange={this.updateData.bind(this)} className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="password" placeholder="******************" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center justify-center">
                            <button onClick={this.login.bind(this)} className="shadow bg-green-dark hover:bg-green focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                Login
                            </button>
                        </div>
                        </form>
                    </ModalBody>
                </Modal>
                <button onClick={this.toggleSignup} className="bg-green m-1 hover:bg-green-darkest text-white font-bold py-1 px-3 rounded">
                    REGISTER
                </button>
                <Modal isOpen={this.state.modalSignup} toggle={this.toggleSignup} >
                    <ModalHeader toggle={this.toggleSignup}>
                        REGISTER
                    </ModalHeader>
                    <ModalBody>
                    <form className="content-between w-full max-w">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Username
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input onChange={this.updateData.bind(this)} name="usernamereg" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="text"  placeholder="Userme" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    E-mail
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input onChange={this.updateData.bind(this)} name="emailreg" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="text"  placeholder="Email" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Password
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input onChange={this.updateData.bind(this)} name="passwordreg" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" type="password" placeholder="password" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center justify-center">
                            <button onClick={this.register.bind(this)} className="shadow bg-green-dark hover:bg-green focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                Register
                            </button>
                        </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Loginfase;