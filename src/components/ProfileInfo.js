import React, { Component } from 'react'

//Components
import ProfileModal from './ProfileModal'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Card, Icon, Image } from 'semantic-ui-react'

class ProfileInfo extends Component {

  render(){
   return ( <div className='userContainer'>
    <Card>
      <Image src={this.props.user.img_url} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{this.props.user.name}</Card.Header>
        <Card.Meta>
          <span className='date'>{this.props.user.neighborhood}</span>
          <p>
            <Icon name='paw' />
            {this.props.user.bio}
          </p>
        </Card.Meta>
        <Card.Description>
          {this.props.user.phone}
          <br/>
          {this.props.user.email}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ProfileModal user={this.props.user} handleEditUser={this.props.handleEditUser}  />
      </Card.Content>
    </Card>
   </div>
 )
  }
}

export default ProfileInfo
