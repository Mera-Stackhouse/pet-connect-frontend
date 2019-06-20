import React, { Component } from 'react'

import AcceptReqModal from './AcceptReqModal'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Image } from 'semantic-ui-react'

class ReceivedCard extends Component {


  render(){
    return (<div>
      <div className='userContainer'>
        <div className='imgContainer'>
          <Image src={this.props.user.img_url} rounded size='tiny' />
        </div>
          <AcceptReqModal user={this.props.user} currentUser={this.props.currentUser} handleAcceptReq={this.props.handleAcceptReq} />
      </div>
      <div className='userContainer'>
        <div className='nameContainer'>
          <p className='text2'>{this.props.user.name}</p>
        </div>
      </div>
      </div>
   )
  }
}

export default ReceivedCard


  // <Button basic circular icon='add' color='violet'/>
