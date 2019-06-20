import React, { Component } from 'react'

import UserCard from './UserCard'
import FriendCard from './FriendCard'

//CSS
import '../css/Friends.css'

const USER_URL = 'http://localhost:3000/api/v1/users'
const FRIENDS_URL = 'http://localhost:3000/api/v1/users/friends/'

class FriendsContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      allUsers: null,
      friendIds: null,
      friends: false,
      users: false
    }

    fetch(USER_URL)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        allUsers: data
      })
    })
    .then(() => {
      this.setState({
        users: true
      })
    })

    fetch(FRIENDS_URL + '/' + this.props.user.id)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        friendIds: data
      })
    })
    .then(() => {
      this.setState({
        friends: true
      })
    })
  }

  getUsers = () => {
    let otherUsers = this.state.allUsers.filter(u => u.id !== this.props.user.id)
    otherUsers = otherUsers.filter(u => !this.state.friendIds.includes(u.id))
    return otherUsers.map(u => {
      return <UserCard key={u.id} user={u} currentUser={this.props.user}/>
    })
  }

  getFriends = () => {
    let friends = this.state.allUsers.filter(u => u.id !== this.props.user.id)
    friends = friends.filter(f => this.state.friendIds.includes(f.id))

    return friends.map(f => {
      return <FriendCard key={f.id} user={f} />
    })
  }

  render(){
    return <div className='FriendsContainer'>
      <div className='leftColumn'>
        <div className='allUsersList'>
          <div className='CenteredContainerNoMargin'>
            <h2 className='text2'>Find friends</h2>
            <br/>
          </div>
            {this.state.users && this.state.friends ?
              this.getUsers()
            :
              <p className='text2'>Loading!</p>}
        </div>
      </div>
      <div className='rightColumn'>
        <div className='friendsList'>
          <div className='CenteredContainerNoMargin'>
            <h2 className='text2'>Your friends</h2>
            <br/>
          </div>
            {this.state.users && this.state.friends ?
              this.getFriends()
            :
              <p className='text2'>Loading!</p>}
        </div>
      </div>
    </div>
  }
}

export default FriendsContainer
