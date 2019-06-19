import React, { Component } from 'react'

//Components
import ProfileModal from './ProfileModal'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Icon, Image } from 'semantic-ui-react'

class ProfileInfo extends Component {

  render(){
    return (
    <div className='userContainer'>
      <div className='imgContainer'>
        <Image src={this.props.user.img_url} rounded size='small' />
      </div>
      <div className='infoContainer'>
        <div className='CenteredContainerNoMargin'>
          <h3 className='text2'>{this.props.user.name}</h3>
        </div>
        <div className='CenteredContainerNoMargin'>
          <span className='date'>{this.props.user.neighborhood}</span>
        </div>
        <div className='CenteredContainerNoMargin'>
          <p>
            <Icon name='paw' />
            {this.props.user.bio}
          </p>
        </div>
        <div className='CenteredContainerNoMargin'>
          {this.props.user.phone}
        </div>
        <div className='CenteredContainerNoMargin'>
          {this.props.user.email}
        </div>
        <div className='CenteredContainerNoMargin'>
          <div className='infoContainer'>
            <ProfileModal user={this.props.user} handleEditUser={this.props.handleEditUser}  />
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default ProfileInfo
