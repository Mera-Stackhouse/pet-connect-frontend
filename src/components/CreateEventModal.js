import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

import PetModal from './PetModal'

import Select from "react-dropdown-select"

//Fetch URL
const USER_URL = 'http://localhost:3000/api/v1/users/'


class CreateEventModal extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      newEvent: {
        users: [0],
        pets: []
      },
      users: [],
      disabled: false
    }

    fetch(USER_URL)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        users: data
      }, () => console.log(this.state.users))
    })
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
      newEvent: {},
      disabled: false
    })
  }

  handleChange = (ev) => {
    console.log('name', ev.target.name)
    console.log('values', ev.target.value)
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        [ev.target.name]: ev.target.value
      }
    }, () => console.log('whole event', this.state.newEvent))
  }

  pickUsers = (ev) => {
    console.log(this.state.newEvent)
    console.log('ev', ev)

    if (ev[0]) {
      this.setState({
        newEvent: {
          ...this.state.newEvent,
          users: [...ev, this.props.user]
        }
      }, () => console.log(this.state.newEvent.users))
    }
  }

  getPets = (pets) => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        pets: pets
      }
    }, () => console.log('here with', this.state.newEvent.pets))
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
        'start_time': this.state.date + 'T' + this.state.time + ":00.000-0700"
      }
    }, () => console.log('the new event', this.state.newEvent))

    this.setState({
      open: false
    })

    this.props.newEventFetch(this.state.newEvent)
  }

  render(){
   return <Modal
             trigger={<Button onClick={this.toggle}>Create a New Event</Button>}
             open={this.state.open}
             onClose={this.toggle}
             closeIcon>
     <Header icon='edit' content='Create an Event' />
     <Modal.Content>
       <Form>
         <Form.Field>
           <label>Event Name</label>
           <input name='event_type' onChange={this.handleChange}/>
         </Form.Field>
         <Form.Field>
           <label>Date and Time</label>
           <input type='time' name='time' onChange={this.setTime}/>
           <input type='date' name='date' onChange={this.setDate}/>
         </Form.Field>
         <Form.Field>
           <label>Location</label>
           <input name='location' onChange={this.handleChange}/>
         </Form.Field>
         <Form.Field>
           <label>Users</label>
           <Select
            options={this.state.users}
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
       <PetModal users={this.state.newEvent.users} getPets={this.getPets}/>
     </Modal.Content>
     <Modal.Actions>
       <Button onClick={this.handleSubmit} disabled={this.state.disabled}>
         Submit
       </Button>
     </Modal.Actions>
   </Modal>
  }
}

export default CreateEventModal
