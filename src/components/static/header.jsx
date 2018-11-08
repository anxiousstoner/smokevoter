//dependencies
import React, { Component } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import { Link } from 'react-router-dom'
//components
import Loginfase from './Loginfase'
//css
import '../../css/tailwind.css'



class Header extends Component {
    constructor (){
        super()
        this.state={
            login:false
        }
    }
    componentWillMount() {
        var login=localStorage.getItem("user");
        if(!login){
            return this.setState({ login:false })
        }
        this.setState({ 
            login:true,
            user:login
        })
    }
    render() {
        return (
            <nav className="bg-green-dark text-white p-1 sm:w-full md:w-full lg:w-full">
                <div className="flex xl:mx-32 sm:mx-4 justify-between">
                    <div className="self-center flex">
                    <Link to={'/'} style={{textDecoration: 'none',color: 'white'}} ><img className="w-32 h-auto flex" alt="logo smokvoter" src="/icons/logo.svg" /></Link>
                    </div>
                    {this.state.login ? <Logintrue user={this.state.user} /> : <Loginfase  /> }
                </div>
            </nav>
        );
    }
}


class Logintrue extends Component {
    constructor() {
        super(); 
        this.toggle = this.toggle.bind(this);
        this.state = {
          popoverOpen: false
        }
    }
    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = '/loading'
    }
    toggle() {
        this.setState({
          popoverOpen: !this.state.popoverOpen
        })
    }
    render() {
        return (
            <div className="flex">
                <span id="usernamenav" className="m-auto text-2xl" onClick={this.toggle} >{this.props.user}</span>
                <Popover className={'flex'}  placement="bottom" isOpen={this.state.popoverOpen} target="usernamenav" toggle={this.toggle}>
                    <PopoverBody >
                        <ul className="list-reset p-2">
                            <li className="py-2">
                                <img src="/icons/settings.svg" className="w-4 h-4 mr-2" alt="icon settings" />
                                <span>settings</span>
                            </li>
                            <li onClick={this.logout.bind()} className="py-2">
                                <img src="/icons/logout.svg" className="w-4 h-4 mr-2" alt="icon logout" />
                                <span>Logout</span> 
                            </li>
                        </ul>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default Header;