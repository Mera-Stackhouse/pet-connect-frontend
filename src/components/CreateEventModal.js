import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

import PetModal from './PetModal'


class CreateEventModal extends Component {
  state = {
    open: false
  }

  toggle = () => {
    this.setState({
      open: !this.state.open
    })
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
           <input name='event_type'/>
         </Form.Field>
         <Form.Field>
           <label>Date and Time</label>
           <input type='date' name='start_time'/>
         </Form.Field>
         <Form.Field>
           <label>Location</label>
           <input name='location'/>
         </Form.Field>
         <Form.Field>
           <label>Users</label>
           <input name='users'/>
         </Form.Field>
         <br/>
       </Form>
       <PetModal />
     </Modal.Content>
     <Modal.Actions>
       <Button onClick={this.handleSubmit}>
         Submit
       </Button>
     </Modal.Actions>
   </Modal>
  }
}

export default CreateEventModal
