import React, { Component } from 'react'

//CSS
import './App.css'

//Components
import Login from './components/Login'
import Main from './components/Main'


const USER_URL = 'http://localhost:3000/api/v1/users/'


class App extends Component {

  constructor() {
    super()

    this.state = {
      loggedIn: false,
      user: null
    }
  }

  toggleLogIn = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  setCurrentUser = (user) => {
    this.setState({
      user: user
    }, () => console.log('user obj', this.state.user))
  }

  handleCreateEvent = () => {
    console.log('here')
  }

  logout = () => {
    this.toggleLogIn()
    this.setCurrentUser(null)
  }

  handleEditUser = (newUser) => {

    fetch(USER_URL + newUser.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: newUser
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log('new user data', data)
      this.setState({
        user: data
      })
    })
  }

  render() {
    return (
        this.state.loggedIn ?
        <div className='background'>
          <Main user={this.state.user} handleCreateEvent={this.handleCreateEvent} logout={this.logout} handleEditUser={this.handleEditUser}/>
        </div>
        :
        <Login setCurrentUser={this.setCurrentUser} toggleLogIn={this.toggleLogIn}/>
    )
  }
}

export default App


// <Route exact path="/" component={Login}/>
// <Route path="/login" component={Login}/>
// <Redirect to='/events' />

// <NavBar />
// <Route exact path='/' render={() => this.state.user.loggedin ? <Login /> : <Main />} />
