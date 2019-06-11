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
      loggedin: true
    }
  }
  // state = {
  //   user: {
  //     loggedin: true
  //   }
  // }

  render() {
    return (
        this.state.loggedin ?
        <Main />
        :
        <Login />
    )
  }
}

export default App


// <Route exact path="/" component={Login}/>
// <Route path="/login" component={Login}/>
// <Redirect to='/events' />

// <NavBar />
// <Route exact path='/' render={() => this.state.user.loggedin ? <Login /> : <Main />} />
