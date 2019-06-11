import React, { Component } from 'react'

//Components
import EventsContainer from './EventsContainer'
import ProfileContainer from './ProfileContainer'
import FriendsContainer from './FriendsContainer'
import NavBar from './NavBar'

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
      <NavBar />
      <Route path="/events" component={EventsContainer}/>
      <Route path="/profile" component={ProfileContainer}/>
      <Route path="/friends" component={FriendsContainer}/>
    </>
   )
  }
}

export default Main
