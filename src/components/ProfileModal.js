import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

const EVENT_URL = 'http://localhost:3000/api/v1/events/'

class ProfileModal extends Component {
  state = {
    newUser: {},
    open: false
  }

  // getDerivedStateFromProps() {
  // 
  // }

  // componentDidMount() {
  //   console.log('here', this.props.user)
  //   this.setState({
  //     newUser: this.props.user
  //   })
  // }

  changeForm = (ev) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [ev.target.name]: ev.target.value
      }
    })
  }

  handleSubmit = () => {
    this.setState({
      open: false
    })
    this.props.handleFetch(this.state.newUser)
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
            <label>Name</label>
            <input name='name' value={this.state.newUser.name} onChange={this.changeForm} />
          </Form.Field>
          <Form.Field>
            <label>Neighborhood</label>
            <input name='neighborhood' value={this.state.newUser.neighborhood} onChange={this.changeForm} />
          </Form.Field>
          <Form.Field>
            <label>Phone</label>
            <input name='phone' value={this.state.newUser.phone} onChange={this.changeForm} />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input name='email' value={this.state.newUser.email} onChange={this.changeForm} />
          </Form.Field>
          <Form.Field>
            <label>Bio</label>
            <input name='bio' value={this.state.newUser.bio} onChange={this.changeForm} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={this.props.handleSubmit}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default ProfileModal
