import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Image, Icon } from 'semantic-ui-react'

//CSS
import '../css/Events.css'

//Components
import EditEventModal from './EditEventModal'

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_EMBED_API_KEY}`

const EVENT_URL = 'http://localhost:3000/api/v1/events/'

class EventCard extends Component {
  state = {
      event: null
    }

  // componentDidMount() {
  //   fetch(EVENT_URL + this.props.event.id)
  //   .then(resp => resp.json())
  //   .then(data => {
  //
  //     this.setState({
  //       event: data.event
  //     })
  //
  //
  //   })
  // }




  getTime = () => {

    const date = new Date(this.props.event.start_time)
    const hours = date.getHours()
    let minutes = date.getMinutes()
    if (minutes.toString().length < 2) {
      minutes = minutes + '0'
    }
    return `At ${hours}:${minutes} am`

  }

  getSearchTerms = () => {
    const array = this.props.event.location.split(' ')
    const string = array.join('+')
    return string
  }

  //The render below:
  //refactor to check for event object once

  render(){
    return (
      this.props.event ?
      (
        <div className='EventCard' >
          <div className='EventTitle'>
            <h2>{this.props.event.event_type} with</h2>
          </div>

          <div className='CenteredContainer'>
            {this.props.event.users.map (u => {
              return <div key={u.id}>
                {this.props.user.id === u.id ?
                  null
                  :
                  <div className='users' key={u.id}>
                    <Image circular size='small' src={u.img_url} />
                    <center><p>{u.name}</p></center>
                  </div>
                }
              </div>
            })}
          </div>
          <br/>
          <div className='CenteredContainer'>
            {this.props.event.pets.map (p => {
              return <div className='pets' key={p.id}>
                <Image circular size='tiny' src={p.img_url} />
                <center><p>{p.name}</p></center>
              </div>
            })}
          </div>
          <br/>
          <p>{this.getTime()}</p>
          <Icon name='map marker alternate' />{this.props.event.location}
          <div className='EventMap'>
            <iframe
              title='googleMaps'
              width="100%"
              height="150"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${this.getSearchTerms()}`} >
            </iframe>
          </div><br />
          <div className='EventButton'>
            <EditEventModal event={this.props.event} key={this.props.event.id} user={this.props.user} editEventFetch={this.editEventFetch}/>
          </div>
        </div>
      )
      :
      null
    )




  }
}

export default EventCard

// how to properly embed a google maps - but you need to fix the addresses for this
// <div>
//   <iframe
//     width="450"
//     height="250"
//     frameBorder="0"
//     src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCUhKXh64JWDhIaGsEbRoBam8PAbMSPbK8&q=Green+Lake+Park" >
//   </iframe>
// </div><br />
