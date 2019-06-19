import React, { Component } from 'react'

//CSS
import '../css/NavBar.css'

import { Link, withRouter } from "react-router-dom"

//Semantic
//import 'semantic-ui-css/semantic.min.css'
import { Button, Icon } from 'semantic-ui-react'

class NavBar extends Component {

  constructor(){
    super()
    this.state = {

    }
  }

  handleLogout = () => {
    this.props.history.push('/')
    this.props.logout()
  }

  render(){
    return (
      // add Banner
      <div className='main'>
      <div className='center'>
        <div className='main'>
          <h1 className='navbar'>P</h1>
        </div>
        <Button basic color='violet' animated size='huge' as={Link} to='/events'>
          <Button.Content visible>
            <Icon name='calendar alternate outline' />
          </Button.Content>
          <Button.Content hidden>
            Events
          </Button.Content>
        </Button>
        <Button basic color='violet' animated size='huge' as={Link} to='/friends'>
          <Button.Content visible>
            <Icon name='users' />
          </Button.Content>
          <Button.Content hidden>
            Friends
          </Button.Content>
        </Button>
        <Button basic color='violet' animated size='huge' as={Link} to='/profile'>
          <Button.Content visible>
            <Icon name='id card outline' />
          </Button.Content>
          <Button.Content hidden>
            Profile
          </Button.Content>
        </Button>
        <Button basic color='violet' animated size='huge' onClick={this.handleLogout}>
          <Button.Content visible>
            <Icon name='log out' />
          </Button.Content>
          <Button.Content hidden>
            Log Out
          </Button.Content>
        </Button>
      </div>
      </div>
    )
  }
}

export default withRouter(NavBar)
