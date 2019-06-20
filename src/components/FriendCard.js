import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Image, Button } from 'semantic-ui-react'

class FriendCard extends Component {


  render(){
    return (<div>
      <div className='userContainer'>
        <div className='imgContainer'>
          <Image src={this.props.user.img_url} rounded size='tiny' />
        </div>
        <Button basic circular icon='checkmark' color='violet'/>
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

export default FriendCard
