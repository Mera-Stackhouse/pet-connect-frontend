import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Modal, Form } from 'semantic-ui-react'

import CreateEventsPetsModal from './CreateEventsPetsModal'

import Select from "react-dropdown-select"

//Fetch URL
const USER_URL = 'http://localhost:3000/api/v1/users/'
const FRIENDS_URL = 'http://localhost:3000/api/v1/users/friends'


class CreateEventModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      newEvent: {
        users: [0],
        pets: []
      },
      users: [],
      disabled: false,
      friendIds: null,
      friends: []
    }

    this.fetchFunction()
  }

  fetchFunction =  async () => {
    await fetch(USER_URL)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        users: data
      })
    })

    await fetch(FRIENDS_URL + '/' + this.props.user.id)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        friendIds: data.friends.map(f => f[1])
      })
    })

    const friends = this.state.users.filter(u => this.state.friendIds.includes(u.id))
    this.setState({
      friends: friends
    }, () =>  console.log(this.state.friends))
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
      newEvent: {},
      disabled: false
    })
  }

  handleChange = (ev) => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        [ev.target.name]: ev.target.value
      }
    })
  }

  pickUsers = (ev) => {

    if (ev[0]) {
      this.setState({
        newEvent: {
          ...this.state.newEvent,
          users: [...ev, this.props.user]
        }
      })
    }
  }

  getPets = (pets) => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        pets: pets
      }
    })
  }

  showPets = () => {
    if (this.state.newEvent.pets) {
      return <div>
        {this.state.newEvent.pets.map(p => {
          return <span>{p.name}<br/></span>
        })}
      </div>
    }
    return
  }

  setTime = (ev) => {
    this.setState({
      time: ev.target.value
    })
  }

  setDate = (ev) => {
    this.setState({
      date: ev.target.value
    })
  }

  handleSubmit = async () => {
    this.setState({
      disabled: true
    })
    await this.setState({
      newEvent: {
        ...this.state.newEvent,
        'start_time': this.state.date + 'T' + this.state.time + ":00.000-0800"
      }
    })

    this.setState({
      open: false
    })

    this.props.newEventFetch(this.state.newEvent)
  }

  render(){
   return <Modal
             trigger={<Button basic color='violet' onClick={this.toggle}>Create a New Event</Button>}
             open={this.state.open}
             onClose={this.toggle}
             closeIcon>
     <Header icon='add' color='violet' content='Create an Event' />
     <Modal.Content>
       <Form>
         <Form.Field>
           <label>Event Name</label>
           <input name='event_type' onChange={this.handleChange}/>
         </Form.Field>
         <Form.Field>
           <label>Date and Time</label>
           <input type='date' name='date' onChange={this.setDate}/>
           <input type='time' name='time' onChange={this.setTime}/>
         </Form.Field>
         <Form.Field>
           <label>Location</label>
           <input name='location' onChange={this.handleChange}/>
         </Form.Field>
         <Form.Field>
           <label>Users</label>
           <Select
            options={this.state.friends}
            valueField='name'
            keepSelectedInList={false}
            name='users'
            onChange={this.pickUsers}
            noDataLabel="There are no users with that name"
            addPlaceholder="Add another user..."
            searchBy='name'
            labelField='name'
            multi={true}
          />
         </Form.Field>
         <Form.Field>
           <label>Pets</label>
           {this.showPets()}
         </Form.Field>
         <br/>
       </Form>
       <CreateEventsPetsModal users={this.state.newEvent.users} getPets={this.getPets}/>
     </Modal.Content>
     <Modal.Actions>
       <Button basic color='violet' onClick={this.handleSubmit} disabled={this.state.disabled}>
         Submit
       </Button>
     </Modal.Actions>
   </Modal>
  }
}

export default CreateEventModal
