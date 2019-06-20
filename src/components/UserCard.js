import React, { Component } from 'react'

import AddFriendModal from './AddFriendModal'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Image } from 'semantic-ui-react'

class UserCard extends Component {


  render(){
    return (<div>
      <div className='userContainer'>
        <div className='imgContainer'>
          <Image src={this.props.user.img_url} rounded size='tiny' />
        </div>
          <AddFriendModal user={this.props.user} currentUser={this.props.currentUser} />
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

export default UserCard


  // <Button basic circular icon='add' color='violet'/>
