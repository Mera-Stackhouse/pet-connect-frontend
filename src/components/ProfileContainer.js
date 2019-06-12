import React, { Component } from 'react'

//Fetch URL
const USER_URL = 'http://localhost:3000/api/v1/users/21'

class ProfileContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: {}
    }

    fetch(USER_URL)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        user: data
      })
    })
  }

  render(){
    return 'ProfileContainer'
  }
}

export default ProfileContainer
