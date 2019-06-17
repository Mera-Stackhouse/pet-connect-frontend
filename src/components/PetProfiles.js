import React, { Component } from 'react'

import CreatePetModal from './CreatePetModal'

//CSS
import '../css/Profile.css'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Image, Icon, Card, Modal, Button } from 'semantic-ui-react'

class PetProfiles extends Component {

  constructor(){
    super()
    this.state = {

    }
  }

  render(){
    return <div className='petsContainer'>
    <div>
      <CreatePetModal user={this.props.user}/>
    </div>
      {this.props.pets ?
        (
          <Card.Group itemsPerRow={2}>
            {this.props.pets.map( p => {
              return (<Card>
                <Card.Content>
                  <Image size='tiny' src={p.img_url} />
                  <Card.Header>{p.name}</Card.Header>
                  <Card.Meta>{p.breed}</Card.Meta>
                </Card.Content>
                </Card>
              )
            })}
          </Card.Group>
        )
        :
        null
      }
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
