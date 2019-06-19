import React, { Component } from 'react'
import Select from "react-dropdown-select"

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Modal, Form } from 'semantic-ui-react'

const PETS_URL = 'http://localhost:3000/api/v1/pets'

class CreateEventsPetsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedPets: [],
      releventPets: [],
      allPets: [],
      userIdList: []
    }

    fetch(PETS_URL)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        allPets: data
      })
    })
  }

  getUserIdArray = async () => {
    const newUserIdList = this.props.users.map(u => u.id)
    await this.setState({
      userIdList: newUserIdList
    }, () => console.log('user id list',this.state.userIdList))
    this.getSelectedPets()
  }

  getSelectedPets = () => {
    const releventPets = []
    this.state.allPets.forEach(p => {
      p.users_ids.forEach(u => {
        if (this.state.userIdList.includes(u) && !(releventPets.filter(x => x.id === p.id).length > 0)) { releventPets.push(p)  }
      })
    })
    this.setState({
      releventPets: releventPets
    }, () => console.log('relevant pets', releventPets))
  }

  pickPets = (ev) => {
    console.log(ev)
    if (ev[0]) {
      this.setState({
        selectedPets: ev
      }, () => console.log('selected', this.state.selectedPets))
    }
  }


  toggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render(){
   return <Modal
             trigger={<Button onClick={() => {
               this.toggle()
               this.getUserIdArray()
             }}
             >Choose Pets</Button>}
             open={this.state.open}
             onClose={this.toggle}
             closeIcon>
     <Header icon='edit' content='Choose Pets' />
     <Modal.Content>
       <Form>
         <Form.Field>
           <label>Pets</label>
           <Select
            options={this.state.releventPets}
            valueField='name'
            keepSelectedInList={false}
            name='users'
            onChange={this.pickPets}
            noDataLabel="There are no pets with that name"
            addPlaceholder="Add another pet..."
            searchBy='name'
            labelField='name'
            multi={true}
          />
         </Form.Field>
       </Form>
     </Modal.Content>
     <Modal.Actions>
       <Button onClick={() => {
         this.toggle()
         this.props.getPets(this.state.selectedPets) }
       }>
         Done
       </Button>
     </Modal.Actions>
   </Modal>
  }
}

export default CreateEventsPetsModal
