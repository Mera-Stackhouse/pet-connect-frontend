import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

import Select from "react-dropdown-select"

const EVENT_URL = 'http://localhost:3000/api/v1/events/'
const USER_URL = 'http://localhost:3000/api/v1/users/'

class EventModal extends Component {
  constructor() {
    super()
    this.state = {
      newEvent: {},
      open: false,
      users: [],
      pets: [],
      time: '',
      date: ''
    }

    fetch(USER_URL)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        users: data
      })
    })
  }


  async componentDidMount() {
    await this.setState({
      newEvent: this.props.event,
    })
    this.setState({
      time: this.getTime(this.state.newEvent.start_time),
      date: this.state.newEvent.start_time.slice(0, 10)
    })
  }

  changeForm = (ev) => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        [ev.target.name]: ev.target.value
      }
    })
  }

  handleSubmit = () => {
    this.setState({
      open: false,
      newEvent: {
        ...this.state.newEvent,
        start_time: this.state.date + "T" + this.state.time + ':00.000-0800'
      }
    }, () => console.log(this.state.newEvent))
    this.props.handleFetch(this.state.newEvent)
  }

  setTime = (ev) => {
    console.log(ev.target.value)
    this.setState({
      time: ev.target.value
    })
  }

  setDate = (ev) => {
    console.log(ev.target.value)
    this.setState({
      date: ev.target.value
    })
  }

  toggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  getTime = (start_time) => {
    if (start_time) {
      const date = new Date(start_time)
      let minutes = date.getMinutes()
      let hours = date.getHours()
      if (minutes.toString().length < 2) {
        minutes = minutes + '0'
      }
      if (hours.toString().length < 2) {
        hours = '0' + hours
      }
      return hours + ":" + minutes
    } else {
      return null
    }
  }

  pickUsers = (ev) => {
    // console.log(this.state.newEvent)
    // console.log('ev', ev)
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        users: [...ev]
      }
    })

    // if (ev[0]) {
    //   this.setState({
    //     newEvent: {
    //       ...this.state.newEvent,
    //       users: [...ev]
    //     }
    //   }, () => console.log(this.state.newEvent.users))
    // }
  }

  render() {
    return <Modal
              trigger={<Button onClick={this.toggle}>Edit</Button>}
              open={this.state.open}
              onClose={this.toggle}
              closeIcon>
      <Header icon='edit' content='Edit this Event' />
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Event Name</label>
            <input name='event_type' value={this.state.newEvent.event_type} onChange={this.changeForm} />
          </Form.Field>
          <Form.Field>
            <label>Date and Time</label>
            <input type='date' name='date' value={this.state.date} onChange={this.setDate}/>
            <input type='time' name='time' value={this.state.time} onChange={this.setTime}/>
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input name='location' value={this.state.newEvent.location} onChange={this.changeForm} />
          </Form.Field>
          <Form.Field>
            <label>Users</label>
            <Select
             options={this.state.users}
             valueField='name'
             values={this.state.newEvent.users}
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

        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={this.handleSubmit}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default EventModal
