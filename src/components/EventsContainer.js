import React, { Component } from 'react'

//CSS
import '../css/Events.css'

//Components
import EventList from './EventList'
import EventCard from './EventCard'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Grid, Menu, Segment } from 'semantic-ui-react'

//Fetch URL
const USER_URL = 'http://localhost:3000/api/v1/users/21'

class EventsContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      events: [],
      activeItem: '',
      user: 21
    }

    fetch(USER_URL)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        events: data.user.events
      }, () => console.log(this.state.events))
    })
  }

  handleItemClick = (string) => {
    this.setState({
      activeItem: string
    })
  }


  render(){
    return <div className='EventsContainer'>

      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            {this.state.events.map(e => {
              return <EventList
                      key={e.id}
                      event={e}
                      activeItem={this.state.activeItem}
                      handleItemClick={this.handleItemClick}
                    />
            })}
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            {this.state.events.map(e => {
              return this.state.activeItem === e.id ?
              <EventCard
                event={e}
                user={this.state.user}
                key={e.id}
              />
              :
              null
            })}
          </Segment>
         </Grid.Column>
      </Grid>
    </div>
  }
}

export default EventsContainer

//
// <EventList key={e.id} event={e} />
//
//
// <Menu.Item
//   name='bio'
//   active={this.state.activeItem === 'bio'}
//   onClick={this.handleItemClick} />
// </Menu>
// </Grid.Column>
//
// <Grid.Column stretched width={12}>
// <Segment>
// This is an stretched grid column. This segment will always match the tab height
// </Segment>
