import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Modal, Form } from 'semantic-ui-react'

class EditPetModal extends Component {

  constructor(){
    super()
    this.state = {
      open: false,
      newPet: {}
    }
  }

  componentDidMount() {
    this.setState({
      newPet: this.props.pet
    })
  }

  toggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleChange = (ev) => {
    this.setState({
      newPet: {
        ...this.state.newPet,
        [ev.target.name]: ev.target.value
      }
    })
  }

  handleSubmit = () => {
    this.setState({
      disabled: true,
      open: false
    })
    this.props.handleEditPet(this.state.newPet)
  }

  render(){
   return <Modal
             trigger={<Button basic color='violet' onClick={this.toggle}>Edit</Button>}
             open={this.state.open}
             onClose={this.toggle}
             closeIcon>
     <Header icon='edit' color='violet' content='Edit this Pet' />
     <Modal.Content>
       <Form>
         <Form.Field>
           <label>Name</label>
           <input name='name' value={this.state.newPet.name} onChange={this.handleChange}/>
         </Form.Field>
         <Form.Field>
           <label>Breed</label>
           <input name='breed' value={this.state.newPet.breed} onChange={this.handleChange}/>
         </Form.Field>
         <Form.Field>
           <label>Image URL</label>
           <input name='img_url' value={this.state.newPet.img_url} onChange={this.handleChange}/>
         </Form.Field>
       </Form>
     </Modal.Content>
     <Modal.Actions>
       <Button basic color='violet' onClick={this.handleSubmit} disabled={this.state.disabled}>
         Submit
       </Button>
     </Modal.Actions>
   </Modal>
  }
}

export default EditPetModal