import React, { Component } from 'react'

//Components
import EventsContainer from './EventsContainer'
import ProfileContainer from './ProfileContainer'
import FriendsContainer from './FriendsContainer'
import NavBar from './NavBar'
import Welcome from './Welcome'

//Elements from packages
import { Route } from "react-router-dom"

class Main extends Component {

  constructor(){
    super()
    this.state = {

    }
  }

  render(){
   return (
     <>
      <NavBar logout={this.props.logout}/>
      <Route path="/events" render={() => <EventsContainer user={this.props.user} handleCreateEvent={this.props.handleCreateEvent}/>}
      />
      <Route path="/profile" render={() => <ProfileContainer user={this.props.user} handleEditUser={this.props.handleEditUser}/>}/>
      <Route path="/friends" component={FriendsContainer}/>
      <Route exact path="/" component={Welcome}/>
    </>
   )
  }
}

export default Main
