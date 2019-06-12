import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

const EVENT_URL = 'http://localhost:3000/api/v1/events/'

class EventModal extends Component {
  state = {
    newEvent: {},
    open: false
  }

  componentDidMount() {
    this.setState({
      newEvent: this.props.event
    })
  }

  changeForm = (ev) => {
    this.setState({
      newEvent: {
        ...this.props.event,
        [ev.target.name]: ev.target.value
      }
    })
  }

  handleSubmit = () => {
    this.setState({
      open: false
    })
    this.props.handleFetch(this.state.newEvent)
  }

  toggle = () => {
    this.setState({
      open: !this.state.open
    })
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
            <label>Time</label>
            <input name='start_time' value={this.state.newEvent.start_time} onChange={this.changeForm} />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input name='location' value={this.state.newEvent.location} onChange={this.changeForm} />
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
