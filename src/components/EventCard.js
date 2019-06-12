import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Image, Icon } from 'semantic-ui-react'

//CSS
import '../css/Events.css'

//Components
import EventModal from './EventModal'

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_EMBED_API_KEY}`

const EVENT_URL = 'http://localhost:3000/api/v1/events/'

class EventCard extends Component {
  state = {
      event: {}
    }

  componentDidMount() {
    fetch(EVENT_URL + this.props.event.id)
    .then(resp => resp.json())
    .then(data => {

      this.setState({
        event: data.event
      }, () => console.log(this.state.event))


    })
  }

  handleFetch = (newEvent) => {
    console.log(newEvent)
    fetch(EVENT_URL + newEvent.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        event: newEvent
      })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        event: newEvent
      })
    })
  }

  // createAddressURL = (string) => {
  //   const array = string.split(' ')
  //   const number = array[0]
  //   const street = array[1]
  //   const street2 = array[2]
  //   const city = array[3]
  //   const state = array[4]
  //   return `https://maps.google.com/maps?width=100%&amp;height=200&amp;hl=en&amp;q=${number}+${street}+${street2.slice(0, -1)}+${city.slice(0, -1)}+${state}+()&amp;ie=UTF8&amp;t=&amp;z=15&amp;iwloc=B&amp;output=embed`
  // }
  //The render below:
  //refactor to check for event object once

  render(){
    return <div className='EventCard' >
    <div className='EventTitle'>
      <h2>{this.props.event.event_type} with</h2>
    </div>

    <div className='CenteredContainer'>
      {this.state.event.users && this.state.event.users.map (u => {
        return <>
          {this.props.user === u.id ?
            null
            :
            <div className='users' key={u.id}>
              <Image circular size='small' src={u.img_url} />
              <center><p>{u.name}</p></center>
            </div>
          }
        </>
      })}
    </div>
    <br/>
    <div className='CenteredContainer'>
      {this.state.event.pets && this.state.event.pets.map (p => {
        return <div className='pets' key={p.id}>
          <Image circular size='tiny' src={p.img_url} />
          <center><p>{p.name}</p></center>
        </div>
      })}
    </div>
    <br/>
    <Icon name='map marker alternate' />{this.state.event.location}
    <div className='EventMap'>
      <iframe
        title='googleMaps'
        width="100%"
        height="150"
        frameBorder="0"
        src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=Green+Lake+Park`} >
      </iframe>
    </div><br />
    <div className='EventButton'>
      <EventModal event={this.state.event} key={this.state.event.id} handleFetch={this.handleFetch}/>
    </div>
    </div>
  }
}

export default EventCard

  // <h2>{this.props.event.event_type}</h2>





// {this.state.event.users.map ( u => {
//   return<Image src={u.img_url} size='small' circular />
//
// })}

// how to properly embed a google maps - but you need to fix the addresses for this
// <div>
//   <iframe
//     width="450"
//     height="250"
//     frameBorder="0"
//     src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCUhKXh64JWDhIaGsEbRoBam8PAbMSPbK8&q=Green+Lake+Park" >
//   </iframe>
// </div><br />


// <UserImages user={this.state.event.user}/>
// <PetImages pets={this.state.event.pets}/>



  // {this.createAddressURL(this.props.event.location)}



  // <EventModal
  //   event_type={this.state.event.event_type}
  //   users={this.state.event.users}
  //   pets={this.state.event.pets}
  //   location={this.state.event.location}
  //   users={this.state.event.user}
  // />

  //
  // {this.state.event.users.map (u => <p> {u.name}</p>)}
  // {this.state.event.pets.map (p => <p> {p.name}</p>)}
  // {this.state.event.pets}
  // {this.state.event.location}
