import React, { Component } from 'react'

import UserCard from './UserCard'

const USER_URL = 'http://localhost:3000/api/v1/users'

class FriendsContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      allUsers: null
    }

    fetch(USER_URL)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        allUsers: data
      })
    })
  }

  getUsers = () => {
    if (this.state.allUsers) {
      const otherUsers = this.state.allUsers.filter(u => u.id !== this.props.user.id)
      otherUsers.map(u => {
        return <UserCard key={u.id} user={u}/>
      })
    }
  }

  getFriends = () => {

  }

  render(){
    return <div className='FriendsContainer'>
      <div className='allUsersList'>
        <p>Search for friends</p>
        {this.getUsers()}
      </div>
      <div className='friendsList'>
        <p>Your friends</p>
      </div>
    </div>
  }
}

export default FriendsContainer
