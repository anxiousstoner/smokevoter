import React, { Component } from 'react';
import Bntdelete from './bottonsfollow/bntdelete'
import Bntporcent from './bottonsfollow/bntporcent'
import Bntstade from './bottonsfollow/bntstade'

class Infofollow extends Component {
    render() {
        return (
            <tr key={this.props.infoaccountfollow._id} className="border-2  border-blue">
                <td className="w-1/5 text-left">
                    {this.props.infoaccountfollow.accountvoter}
                </td>
                <td className="w-1/5 text-left">
                    {this.props.infoaccountfollow.accountfollow}
                </td>
                <td className="w-1/5 text-left">
                    {this.props.infoaccountfollow.stado}
                </td>
                <td className="w-1/5 text-left">
                    {this.props.infoaccountfollow.delay}
                </td>
                <td className="w-auto text-left">
                    {this.props.infoaccountfollow.porcent}
                </td>
                <td className="w-auto justify-center flex">
                    <Bntporcent id={this.props.infoaccountfollow._id} />
                    <Bntstade stade={this.props.infoaccountfollow.stado} id={this.props.infoaccountfollow._id} />
                    <Bntdelete id={this.props.infoaccountfollow._id} />
                </td>
            </tr>
        );
    }
}

export default Infofollow;