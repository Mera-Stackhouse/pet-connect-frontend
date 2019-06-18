import React, { Component } from 'react'

import EditPetModal from './EditPetModal'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Image, Icon, Card, Modal, Button } from 'semantic-ui-react'

const PET_URL = 'http://localhost:3000/api/v1/pets'

class PetCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      pet: {}
    }
  }

  componentDidMount() {
    this.setState({
      pet: this.props.pet
    })
  }



  handleEditPet = (newPet) => {
    fetch(PET_URL + "/" + newPet.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        pet: newPet
      })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        pet: data
      })
    })
  }

  render(){
   return (
     <Card key={this.state.pet.id}>
       <Card.Content>
         <div className='CenteredContainerNoMargin'><Image circular size='tiny' src={this.state.pet.img_url} /></div>
         <div className='CenteredContainerNoMargin'><Card.Header>{this.state.pet.name}</Card.Header></div>
         <div className='CenteredContainerNoMargin'><Card.Meta>{this.state.pet.breed}</Card.Meta></div>
       </Card.Content>
       <div className='CenteredContainerNoMargin'><div><EditPetModal pet={this.state.pet} handleEditPet={this.handleEditPet}/></div>
       <div><Button secondary pet={this.state.pet} onClick={() => this.props.handleDelete(this.state.pet)}>Delete</Button></div></div>
       </Card>
   )
  }
}

export default PetCard
