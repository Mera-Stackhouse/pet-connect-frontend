import React, { Component } from 'react'

import EditPetModal from './EditPetModal'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Image, Button } from 'semantic-ui-react'


//CSS
import '../css/Profile.css'

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
      <div className='petCard'>
        <div className='CenteredContainerNoMargin'>
          <Image circular size='tiny' src={this.state.pet.img_url} />
        </div>
        <div className='CenteredContainerNoMargin'>
          <div className='text2'>{this.state.pet.name}</div>
        </div>
        <div className='CenteredContainerNoMargin'>{this.state.pet.breed}</div>
        <div className='CenteredContainerNoMargin'>

            <EditPetModal pet={this.state.pet} handleEditPet={this.handleEditPet}/>

            <Button basic color='violet' secondary onClick={() => this.props.handleDelete(this.state.pet)}>Delete</Button>

        </div>
      </div>
    )
  }
}

export default PetCard
