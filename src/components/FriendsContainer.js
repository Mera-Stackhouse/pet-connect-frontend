import React, { Component } from 'react'

import UserCard from './UserCard'
import FriendCard from './FriendCard'
import SentCard from './SentCard'
import ReceivedCard from './ReceivedCard'

//CSS
import '../css/Friends.css'

const USER_URL = 'http://localhost:3000/api/v1/users'
const FRIENDS_URL = 'http://localhost:3000/api/v1/users/friends'
const RELATIONSHIPS_URL = 'http://localhost:3000/api/v1/user_relationships'

class FriendsContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      allUsers: null,
      usersReady: false,
      friends: null,
      sent: null,
      received: null,
      friendIds: null,
      sentIds: null,
      receivedIds: null,
      friendsReady: false
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
        usersReady: true
      })
    })

    fetch(FRIENDS_URL + '/' + this.props.user.id)
    .then(resp => resp.json())
    .then(data => {
      let friends = data.friends.map(f => f[1])
      let sent = data.sent.map(s => s[1])
      let received = data.received.map(r => r[1])
      this.setState({
        friends: data.friends,
        sent: data.sent,
        received: data.received,
        friendIds: friends,
        sentIds: sent,
        receivedIds: received
      })
    })
    .then(() => {
      this.setState({
        friendsReady: true
      })
    })
  }

  getUsers = () => {
    let otherUsers = this.state.allUsers.filter(u => u.id !== this.props.user.id)
    otherUsers = otherUsers.filter(u => !this.state.friendIds.includes(u.id))
    otherUsers = otherUsers.filter(u => !this.state.sentIds.includes(u.id))
    otherUsers = otherUsers.filter(u => !this.state.receivedIds.includes(u.id))
    return otherUsers.map(u => {
      return <UserCard key={u.id} user={u} currentUser={this.props.user} handleSendRequest={this.handleSendRequest}/>
    })
  }

  getFriends = () => {
    const friends = this.state.allUsers.filter(u => this.state.friendIds.includes(u.id))
    return friends.map(f => {
      return <FriendCard key={f.id} user={f} handleDeleteFriend={this.handleDeleteFriend}/>
    })
  }

  getRecieved = () => {
    const received = this.state.allUsers.filter(u => this.state.receivedIds.includes(u.id))
    return received.map(f => {
      return <ReceivedCard key={f.id} user={f} handleAcceptReq={this.handleAcceptReq}/>
    })
  }

  getSent = () => {
    const sent = this.state.allUsers.filter(u => this.state.sentIds.includes(u.id))
    return sent.map(f => {
      return <SentCard key={f.id} user={f} handleDeleteReq={this.handleDeleteReq}/>
    })
  }

  handleSendRequest = (userId, shipId) => {
    this.setState({
      sentIds: [userId, ...this.state.sentIds],
      sent: [...this.state.sent, [shipId, userId]]
    })
  }

  handleDeleteFriend = (userId) => {
    const user = this.state.friends.filter(u => u[1] === userId)
    const newFriends = this.state.friends.filter(u => u[1] !== userId)
    const relationshipId = user[0][0]
    const newFriendIds = this.state.friendIds.filter(id => id !== userId)

    fetch(RELATIONSHIPS_URL + '/' + relationshipId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        friendIds: newFriendIds,
        friends: newFriends
      })
    })
  }

  handleDeleteReq = (userId) => {
    const user = this.state.sent.filter(u => u[1] === userId)
    const newSent = this.state.sent.filter(u => u[1] !== userId)
    const relationshipId = user[0][0]
    const newSentIds = this.state.sentIds.filter(id => id !== userId)

    fetch(RELATIONSHIPS_URL + '/' + relationshipId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        sentIds: newSentIds,
        sent: newSent
      })
    })
  }

  handleAcceptReq = (userId) => {
    const user = this.state.received.filter(u => u[1] === userId)
    const relationshipId = user[0][0]

    const newReceived = this.state.received.filter(u => u[1] !== userId)
    const newReceivedIds = this.state.receivedIds.filter(id => id !== userId)

    const newFriends = [...this.state.friends, user]
    const newFriendIds = [...this.state.friendIds, userId]

    fetch(RELATIONSHIPS_URL + '/' + relationshipId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        confirmed: true
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log('patch back', data)
      this.setState({
        friends: newFriends,
        friendIds: newFriendIds,
        received: newReceived,
        receivedIds: newReceivedIds
      })
    }, () => console.log(this.state.received))
  }

  render(){
    return <div className='FriendsContainer'>
      <div className='leftColumn'>

        <div className='SentUsers'>
          <div className='CenteredContainerNoMargin'>
            <h2 className='text2'>Sent requests</h2>
            <br/>
          </div>
          <div>
            {this.state.usersReady && this.state.friendsReady ?
              this.getSent()
            :
              <div className='CenteredContainerNoMargin'>
                <p className='text2'>Loading!</p>
              </div>}
          </div>
        </div>

        <br/>

        <div className='allUsersList'>
          <div className='CenteredContainerNoMargin'>
            <h2 className='text2'>Find friends</h2>
            <br/>
          </div>
            {this.state.usersReady && this.state.friendsReady ?
              this.getUsers()
            :
              <div className='CenteredContainerNoMargin'>
                <p className='text2'>Loading!</p>
              </div>}
        </div>

      </div>

      <div className='rightColumn'>

        <div className='friendsList'>
          <div className='CenteredContainerNoMargin'>
            <h2 className='text2'>Your friends</h2>
            <br/>
          </div>
            {this.state.usersReady && this.state.friendsReady ?
              this.getFriends()
            :
              <div className='CenteredContainerNoMargin'>
                <p className='text2'>Loading!</p>
              </div>}
        </div>

        <br/>

        <div className='ReceivedUsers'>
          <div className='CenteredContainerNoMargin'>
            <h2 className='text2'>Received requests</h2>
            <br/>
          </div>
          <div>
            {this.state.usersReady && this.state.friendsReady ?
              this.getRecieved()
            :
              <div className='CenteredContainerNoMargin'>
                <p className='text2'>Loading!</p>
              </div>}
          </div>
        </div>

      </div>
    </div>
  }
}

export default FriendsContainer
