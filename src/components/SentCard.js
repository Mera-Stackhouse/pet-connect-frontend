import React, { Component } from 'react'

import CancelReqModal from './CancelReqModal'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Image } from 'semantic-ui-react'

class SentCard extends Component {


  render(){
    return (<div>
      <div className='userContainer'>
        <div className='imgContainer'>
          <Image src={this.props.user.img_url} rounded size='tiny' />
        </div>
          <CancelReqModal user={this.props.user} currentUser={this.props.currentUser} handleDeleteReq={this.props.handleDeleteReq}/>
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

export default SentCard


  // <Button basic circular icon='add' color='violet'/>
