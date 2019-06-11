import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

class EventModal extends Component {
  state = {
    newEvent: {}
  }

  componentDidMount() {
    this.setState({
      newEvent: this.props.event
    })
  }

  changeForm = (ev) => {
    console.log(ev)
    // this.setState({
    //   newEvent: {
    //     ...this.props.event,
    //     ev.target[name]: ev.target.value
    //   }
    // })
  }

  render() {
    return <Modal trigger={<Button>Edit</Button>} closeIcon>
      <Header icon='edit' content='Edit this Event' />
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Event Name</label>
            <input value={this.props.event.event_type} onChange={this.changeForm}/>
          </Form.Field>
          <Form.Field>
            <label>Time</label>
            <input value={this.props.event.start_time} />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input value={this.props.event.location} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default EventModal
