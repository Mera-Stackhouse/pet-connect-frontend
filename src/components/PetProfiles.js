import React, { Component } from 'react'

import CreatePetModal from './CreatePetModal'
// import EditPetModal from './EditPetModal'
import PetCard from './PetCard'

//CSS
import '../css/Profile.css'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Card } from 'semantic-ui-react'

const PET_URL = 'http://localhost:3000/api/v1/pets'

class PetProfiles extends Component {

  constructor(){
    super()
    this.state = {
      pets: []
    }
  }

  componentDidMount() {
    if (this.props.pets) {
      this.setState({
        pets: this.props.pets
      })
    }
  }

  handleCreatePet = (newPet) => {

    fetch(PET_URL, {
      method: 'POST',
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
        pets: [...this.state.pets, data]
      })
    })
  }

  handleDelete = (pet) => {
    console.log('here', pet)
    fetch(PET_URL + '/' + pet.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        pets: this.state.pets.filter(p => p.id !== pet.id)
      })
    })
  }



  render(){
    return <div className='petsContainer'>
    <div className='CenteredContainer'>
      <CreatePetModal user={this.props.user} handleCreatePet={this.handleCreatePet}/>
    </div>
    <div className=''>
      {this.state.pets ?
        (
          <Card.Group itemsPerRow={2}>
            {this.state.pets.map( p => {
              return <PetCard pet={p} key={p.id} handleDelete={this.handleDelete}/>
            })}
          </Card.Group>
        )
        :
        null
      }
    </div>
    </div>
  }
}

export default PetProfiles

//
// <Card.Group itemsPerRow={3}>
//   {this.props.pets.map( p => {
//     return <Card
//     image={p.img_rul}
//     header={p.name}
//     meta={p.breed}
//     />
//   })}
// </Card.Group>
