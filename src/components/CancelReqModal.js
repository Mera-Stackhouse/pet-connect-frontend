import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Modal} from 'semantic-ui-react'



class CancelReqModal extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      disabled: false
    }
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
      newEvent: {},
      disabled: false
    })
  }

  handleSubmit = () => {
    this.setState({
      disabled: true,
      open: false
    })
    this.props.handleDeleteReq(this.props.user.id)
  }

  render(){
   return <Modal
             trigger={<Button basic circular icon='close' color='violet' onClick={this.toggle}></Button>}
             open={this.state.open}
             onClose={this.toggle}
             closeIcon>
     <Header icon='close' color='violet' content='Cancel Friend Request' />
     <Modal.Content>
      <p>to {this.props.user.name}?</p>
     </Modal.Content>
     <Modal.Actions>
       <Button basic color='violet' onClick={this.handleSubmit} disabled={this.state.disabled}>
         Yes
       </Button>
     </Modal.Actions>
   </Modal>
  }
}

export default CancelReqModal
