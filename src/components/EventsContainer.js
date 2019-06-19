import React, { Component } from 'react'

//CSS
import '../css/Events.css'

//Components
import EventList from './EventList'
import EventCard from './EventCard'
import CreateEventModal from './CreateEventModal'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Grid, Menu, Segment, Button } from 'semantic-ui-react'

//Fetch URL
const USER_URL = 'http://localhost:3000/api/v1/users/'
const EVENT_URL = 'http://localhost:3000/api/v1/events'


class EventsContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      events: [],
      activeItem: ''
    }
  }

  componentDidMount() {
    this.props.user.events.map(e => {
      fetch(EVENT_URL + '/' + e.id)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          events: [...this.state.events, data.event]
        })
      })
    })

  }


  newEventFetch = (event) => {
    fetch(EVENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        event: event
      })
    })
    .then(resp => resp.json())
    .then(data => {

      this.setState({
        events: [...this.state.events, data]
      })
    })
  }

  handleItemClick = (string) => {
    this.setState({
      activeItem: string
    })
  }


  render(){
    return <div className='EventsContainer'>
      <div className='CenteredContainer'>
        <CreateEventModal onClick={this.props.handleCreate} user={this.props.user} newEventFetch={this.newEventFetch}/>
      </div>
      {this.state.events.length === 0 ?
      <div className='CenteredContainer'>
        <p>You don't have any events yet!</p>
      </div>
      :
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
                user={this.props.user}
                key={e.id}
              />
              :
              null
            })}
          </Segment>
         </Grid.Column>
      </Grid>}
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
