import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Image } from 'semantic-ui-react'

class UserCard extends Component {


  render(){
    return (
      <div className='userContainer'>
        <div className='imgContainer'>
          <Image src={this.props.user.img_url} rounded size='tiny' />
        </div>
        <div className='nameContainer'>
          <p className='text2'>{this.props.user.name}</p>
        </div>
      </div>
   )
  }
}

export default UserCard
