import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'


class PetModal extends Component {
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
             trigger={<Button onClick={this.toggle}>Choose Pets</Button>}
             open={this.state.open}
             onClose={this.toggle}
             closeIcon>
     <Header icon='edit' content='Choose Pets' />
     <Modal.Content>
       <Form>
         <Form.Field>
           <label>Pets</label>
           <input name='pets'/>
         </Form.Field>
       </Form>
     </Modal.Content>
     <Modal.Actions>
       <Button onClick={this.toggle}>
         Done
       </Button>
     </Modal.Actions>
   </Modal>
  }
}

export default PetModal
