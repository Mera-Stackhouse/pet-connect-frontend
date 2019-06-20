import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Modal} from 'semantic-ui-react'


//Fetch URL
const RELATIONSHIPS_URL = 'http://localhost:3000/api/v1/user_relationships'


class DeleteFriendModal extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      disabled: false
    }

    // fetch(USER_URL)
    // .then(resp => resp.json())
    // .then(data => {
    //   this.setState({
    //     users: data
    //   })
    // })
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
    fetch(RELATIONSHIPS_URL + '/' + ?????, {
      method: 'DELETE',
    })
    .then(resp => resp.json())
    .then(data => {
      console.log('data', data)
      this.props.handleAddFriend(data.followed_id)
    })

    // await this.setState({
    //   newEvent: {
    //     ...this.state.newEvent,
    //     'start_time': this.state.date + 'T' + this.state.time + ":00.000-0800"
    //   }
    // })
    //
    // this.setState({
    //   open: false
    // })
    //
    // this.props.newEventFetch(this.state.newEvent)
  }

  render(){
   return <Modal
             trigger={<Button basic circular icon='add' color='violet' onClick={this.toggle}></Button>}
             open={this.state.open}
             onClose={this.toggle}
             closeIcon>
     <Header icon='add' color='violet' content='Unfriend' />
     <Modal.Content>
      <p>{this.props.user.name}?</p>
     </Modal.Content>
     <Modal.Actions>
       <Button basic color='violet' onClick={this.handleSubmit} disabled={this.state.disabled}>
         Unfriend
       </Button>
     </Modal.Actions>
   </Modal>
  }
}

export default DeleteFriendModal
