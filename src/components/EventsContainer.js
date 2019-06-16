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

class EventsContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      events: [],
      activeItem: ''
    }
    console.log('user in events', this.props.user)
    //Using App state of the user now
    // fetch(USER_URL + this.props.user.id, {
    //   headers: {
    //     'token': localStorage.getItem('token')
    //   }
    // })
    // .then(resp => resp.json())
    // .then(data => {
    //   console.log('here', data)
    // //   this.setState({
    // //     events: data.user.events
    // //   }, () => console.log(this.state.events))
    // })
  }

  handleItemClick = (string) => {
    this.setState({
      activeItem: string
    })
  }


  render(){
    return <div className='EventsContainer'>
      <div className='CenteredContainer'>
        <CreateEventModal onClick={this.props.handleCreate} user={this.props.user}/>
      </div>
      {this.props.user.events.length === 0 ?
      <div className='CenteredContainer'>
        <p>You don't have any events yet!</p>
      </div>
      :
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            {this.props.user.events.map(e => {
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
            {this.props.user.events.map(e => {
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
