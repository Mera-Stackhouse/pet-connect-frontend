import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

class CreatePetModal extends Component {

  constructor(){
    super()
    this.state = {
      open: false,
      newPet: {}
    }
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
      newPet: {},
      disabled: false
    })
  }

  render(){
   return <Modal
             trigger={<Button onClick={this.toggle}>Add a Pet</Button>}
             open={this.state.open}
             onClose={this.toggle}
             closeIcon>
     <Header icon='edit' content='Add a Pet' />
     <Modal.Content>
       <Form>
         <Form.Field>
           <label>Name</label>
           <input name='name' onChange={this.handleChange}/>
         </Form.Field>
         <Form.Field>
           <label>Breed</label>
           <input name='breed' onChange={this.handleChange}/>
         </Form.Field>
         <Form.Field>
           <label>Image URL</label>
           <input name='img_url' onChange={this.handleChange}/>
         </Form.Field>
       </Form>
     </Modal.Content>
     <Modal.Actions>
       <Button onClick={this.handleSubmit} disabled={this.state.disabled}>
         Submit
       </Button>
     </Modal.Actions>
   </Modal>
  }
}

export default CreatePetModal
