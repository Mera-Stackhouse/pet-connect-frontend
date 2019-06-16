import React, { Component } from 'react'

//CSS
import './App.css'

//Components
import Login from './components/Login'
import Main from './components/Main'

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

  render() {
    return (
        this.state.loggedIn ?
        <div className='background'>
          <Main user={this.state.user} handleCreateEvent={this.handleCreateEvent} logout={this.logout}/>
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
