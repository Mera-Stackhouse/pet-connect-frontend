import React, { Component } from 'react'

//Components
import ProfileInfo from './ProfileInfo'
import PetProfiles from './PetProfiles'

//CSS
import '../css/Profile.css'

//Fetch URL
// const USER_URL = 'http://localhost:3000/api/v1/users/'

class ProfileContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }
  //
  // handleFetch = (newUser) => {
  //   fetch(USER_URL, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user: newUser
  //     })
  //   })
  //   .then(resp => resp.json())
  //   .then(data => {
  //     this.setState({
  //       user: newUser
  //     })
  //   })
  // }

  render(){
    return (
      <div className='ProfileContainer'>
        <ProfileInfo user={this.props.user} handleEditUser={this.props.handleEditUser}/>
        <PetProfiles pets={this.props.user.pets} user={this.props.user}/>
      </div>
    )
  }
}

export default ProfileContainer
