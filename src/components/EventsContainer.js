import React, { Component } from 'react'

//CSS
import '../css/Events.css'

//Components
import EventList from './EventList'
import EventCard from './EventCard'
import CreateEventModal from './CreateEventModal'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Grid, Menu, Segment } from 'semantic-ui-react'

//Fetch URL
// const USER_URL = 'http://localhost:3000/api/v1/users/'
const EVENT_URL = 'http://localhost:3000/api/v1/events'


class EventsContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      events: [],
      activeItem: ''
    }
    this.props.user.events.map(e => {
      fetch(EVENT_URL + '/' + e.id)
      .then(resp => resp.json())
      .then(data => {
        const events = [...this.state.events, data.event]
        const sortedEvents = events.sort((a, b) => {return new Date(a.start_time).getTime() - new Date(b.start_time).getTime()})
        this.setState({
          events: sortedEvents
        })
      })
    })

  }

  // componentDidMount() {
  //   // const events = []
  //   //console.log(this.props.user.events)
  //
  //   // console.log(events)
  //   // this.orderEvents(events)
  //
  //
  // }

  fetchEvent = (e) => {

  }

  orderEvents = () => {

  }

  editEventFetch = (event) => {
    fetch(EVENT_URL + '/' + event.id, {
      method: 'PATCH',
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
      const otherEvents = this.state.events.filter(e => e.id !== event.id)
      const events = [...otherEvents, data]
      const sortedEvents = events.sort((a, b) => {return new Date(a.start_time).getTime() - new Date(b.start_time).getTime()})
      this.setState({
        events: sortedEvents
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
      const otherEvents = this.state.events
      const events = [...otherEvents, data]
      const sortedEvents = events.sort((a, b) => {return new Date(a.start_time).getTime() - new Date(b.start_time).getTime()})
      this.setState({
        events: sortedEvents
      })
    })
  }

  handleItemClick = (string) => {
    this.setState({
      activeItem: string
    })
  }

  handleDelete = (event) => {
    console.log('here')
    fetch(EVENT_URL + '/' + event.id, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(data => {
      const events = this.state.events.filter(e => e.id !== event.id)
      const sortedEvents = events.sort((a, b) => {return new Date(a.start_time).getTime() - new Date(b.start_time).getTime()})
      this.setState({
        events: sortedEvents
      })
    })
  }


  render(){
    return <div className='EventsContainer'>
      <div className='CenteredContainer'>
        <CreateEventModal onClick={this.props.handleCreate} user={this.props.user} newEventFetch={this.newEventFetch}/>
      </div>
      {this.state.events.length === 0 ?
      <div className='CenteredContainer'>
        <p className='text2'>Loading!</p>
      </div>
      :
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular color='violet'>
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
          <Segment color='violet'>
            {this.state.events.map(e => {
              return this.state.activeItem === e.id ?
              <EventCard
                event={e}
                user={this.props.user}
                key={e.id}
                editEventFetch={this.editEventFetch}
                handleDelete= {this.handleDelete}
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
