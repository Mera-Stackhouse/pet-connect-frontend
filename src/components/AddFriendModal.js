import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Modal} from 'semantic-ui-react'


//Fetch URL
const RELATIONSHIPS_URL = 'http://localhost:3000/api/v1/user_relationships'


class AddFriendModal extends Component {
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
    fetch(RELATIONSHIPS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'follower_id': this.props.currentUser.id,
        'followed_id': this.props.user.id
      })
    })
    .then(resp => resp.json())
    .then(data => {
      this.props.handleSendRequest(data.followed_id, data.id)
    })
  }

  render(){
   return <Modal
             trigger={<Button basic circular icon='add' color='violet' onClick={this.toggle}></Button>}
             open={this.state.open}
             onClose={this.toggle}
             closeIcon>
     <Header icon='add' color='violet' content='Send a Friend Request' />
     <Modal.Content>
      <p>to {this.props.user.name}?</p>
     </Modal.Content>
     <Modal.Actions>
       <Button basic color='violet' onClick={this.handleSubmit} disabled={this.state.disabled}>
         Send
       </Button>
     </Modal.Actions>
   </Modal>
  }
}

export default AddFriendModal
