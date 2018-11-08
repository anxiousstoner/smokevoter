import React, { Component } from 'react';
import steem from 'steem'
import '../../css/tailwind.css'

class keys extends Component {
    constructor(){
        super()
        this.state={
            user:null,
            key:null,
            keygne:'keys not generated yet'
        }
        this.generated = this.generated.bind(this);
    }
    key(e){
        var key =e.target.value
        this.setState({ key })
    }
    user(ev){
        var user=ev.target.value
        this.setState({ user })
    }
    generated(){
        let { user,key } = this.state
        let resultkey=steem.auth.getPrivateKeys(user, key, ['owner', 'active', 'posting', 'memo']);
        this.setState({ keygne: JSON.stringify(resultkey) })
    }
    render() {
        return (
            <div className=" w-screen justify-center">
                <center>
                    <input className="mb-3 mt-3 shadow appearance-none border rounded py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" placeholder="Username" type="text" onChange={this.user.bind(this)} /><br />
                    <input className="mb-3 shadow appearance-none border rounded py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" placeholder="Key Owner" type="text" onChange={this.key.bind(this)} /><br />
                    <button onClick={this.generated} className="mb-3 bg-green-dark hover:bg-black text-white font-bold py-2 px-4 border-b-4 border-black hover:border-green-dark rounded" >
                        Gen keys
                    </button>
                    <div className="w-2/5 h-2/5 border border-red-dark break-words">{this.state.keygne}</div>
                    {this.state.keygne!=='keys not generated yet' ? <FormaJson /> : null}
                </center>
            </div>
        );
    }
}

const FormaJson = () =>{
    return (
        <div>
            <br />
            <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"><a target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none',color: 'white'}} href={"https://jsonformatter.curiousconcept.com/"} >JSONFORMATTER</a></button>
        </div>
    )
}

export default keys;