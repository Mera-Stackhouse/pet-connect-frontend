import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Modal} from 'semantic-ui-react'


class AcceptReqModal extends Component {
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
    this.props.handleAcceptReq(this.props.user.id)
  }

  render(){
   return <Modal
             trigger={<Button basic circular icon='checkmark' color='violet' onClick={this.toggle}></Button>}
             open={this.state.open}
             onClose={this.toggle}
             closeIcon>
     <Header icon='checkmark' color='violet' content='Accept Friend Request' />
     <Modal.Content>
      <p>from {this.props.user.name}?</p>
     </Modal.Content>
     <Modal.Actions>
       <Button basic color='violet' onClick={this.handleSubmit} disabled={this.state.disabled}>
         Yes
       </Button>
     </Modal.Actions>
   </Modal>
  }
}

export default AcceptReqModal
