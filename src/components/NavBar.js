import React, { Component } from 'react'

//CSS
import '../css/NavBar.css'

import { Link } from "react-router-dom"

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon } from 'semantic-ui-react'

class NavBar extends Component {

  constructor(){
    super()
    this.state = {

    }
  }

  render(){
    return (
      // add Banner
      <div className='main'>
      <div className='center'>
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
            <Icon name='user' />
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
      </div>
      </div>
    )
  }
}

export default NavBar
