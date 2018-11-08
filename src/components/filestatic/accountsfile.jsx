import React, { Component } from 'react';
import steem from 'steem'
import { Collapse, CardBody, Card } from 'reactstrap';
//import components
import Delete from './bottons/bntdelete'
import Updatekey from './bottons/Updatekey'
import Runstop from './bottons/runstop'
import CollapsU from './CollapsU'
//css
import '../../css/tailwind.css'
import '../../css/mycss.css'

class accountsfile extends Component {
    constructor(props){
        super(props)
        this.state={
            stade: this.props.data.stade,
            usuarioName: this.props.data.usuarioName,
            typeAccount:this.props.data.typeAccount,
            iduser:this.props.data._id,
            infodata:null,
            cfollowf:false,
            getsmkp:'Get SmokPower',
            getvp:'Get VotingPower'
        }
        this.getanon = this.getanon.bind(this)
        this.Cfollow = this.Cfollow.bind(this)
    }
    componentWillMount() {
        steem.api.setOptions({ url: 'ws://104.248.168.86:8090/' });
        steem.api.getAccountsAsync([this.props.data.usuarioName])
        .then(result=>{
            this.setState({ infodata:result })
        })
        .catch( err=>{ window.location.reload() })
    }
    Cfollow(){
        this.setState({ cfollowf: !this.state.cfollowf })
    }
    getanon(e){
        let event=e.target.name
        if(event==='getvp'){
            if(!this.state.infodata){
                return setTimeout(()=>{ 
                    var secondsago = (new Date().getTime() - new Date(this.state.infodata[0].last_vote_time + "Z").getTime()) / 1000;
                    var votingPower=this.state.infodata[0].voting_power+(10000 * secondsago / 432000);
                    var vpcurrent=Math.min((votingPower/100).toFixed(2),100)
                    this.setState({  getvp:`${vpcurrent} VP` })
                },2000)
            }else{
                var secondsago = (new Date().getTime() - new Date(this.state.infodata[0].last_vote_time + "Z").getTime()) / 1000;
                var votingPower=this.state.infodata[0].voting_power+(10000 * secondsago / 432000);
                var vpcurrent=Math.min((votingPower/100).toFixed(2),100)
                this.setState({  getvp:`${vpcurrent} VP` })
            }
        }
        if(event==='getsmkp'){
            steem.api.getDynamicGlobalPropertiesAsync()
            .then(result =>{
                let stake=(steem.formatter.vestToSteem(parseFloat(this.state.infodata[0].vesting_shares), parseFloat(result.total_vesting_shares), parseFloat(result.total_vesting_fund_steem))).toFixed(3)
                this.setState({
                    getsmkp:`${stake} SMK`
                })
            })
            .catch(err=>{ window.location.reload() })
        }
    }
    render() {
        const { iduser,usuarioName,stade,typeAccount }=this.state
        return (
            <div >
                <div className="mt-2 p-2 lg:flex xl:flex rounded bg-green-dark menuxuser">
                    <div className="lg:w-1/5 xl:w-1/5 flex h-auto my-auto md:w-full sm:w-full">
                        <h4>{usuarioName}{typeAccount!=='free' ? '-' : null}</h4>
                        { typeAccount!=='free' ? <img src="/icons/premium.svg" className="w-8 h-8 my-auto" alt="premium" /> : null }
                    </div>
                    <div className="xl:w-2/5 lg:w-2/5 md:w-full sm:w-full text-center border rounded m-auto">
                        <span className="text-white font-bold py-2 px-auto m-2 rounded">{stade==='active' ? 'ACTIVE' : 'INACTIVE'}</span>
                        <button name="getvp" onClick={this.getanon} className="bg-green hover:bg-grey text-white font-bold py-1 px-2 m-2 rounded">{this.state.getvp}</button>
                        <button name="getsmkp" onClick={this.getanon} className="bg-green hover:bg-grey text-white font-bold py-1 px-2 m-2 rounded">{this.state.getsmkp}</button>
                    </div> 
                    <div className="w-auto flex justify-around">
                        <Runstop stade={stade} user={this.state.usuarioName} />
                        <button onClick={this.Cfollow} className="ml-2 bg-green hover:bg-grey text-white font-bold py-2 px-4 rounded">
                            Follows
                        </button>
                        <Updatekey id={iduser} typeaccount={typeAccount} user={this.state.usuarioName} />
                        <Delete id={iduser} user={this.state.usuarioName} />
                    </div>
                </div>
                <Collapse isOpen={this.state.cfollowf}>
                    <Card>
                        <CardBody>
                            {this.state.cfollowf ?
                            <CollapsU typeaccount={typeAccount} user={this.state.usuarioName} /> :
                            null}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export default accountsfile;