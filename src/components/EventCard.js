import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Image, Icon, Button } from 'semantic-ui-react'

//CSS
import '../css/Events.css'

//Components
import EditEventModal from './EditEventModal'

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_EMBED_API_KEY}`

//const EVENT_URL = 'http://localhost:3000/api/v1/events/'

class EventCard extends Component {




  getTime = () => {
    const weekLookup = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday"
    }
    const monthLookup = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    }

    const date = new Date(this.props.event.start_time)
    const month = monthLookup[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    const week = weekLookup[date.getDay()]

    let hours = date.getHours()
    let m = "am"
    if (hours > 12) {
      hours = hours - 12
      m = "pm"
    }
    let minutes = date.getMinutes()
    if (minutes.toString().length < 2) {
      minutes = minutes + '0'
    }
    return `At ${hours}:${minutes} ${m} on ${week} ${month} ${day}, ${year}`

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
            <h2 className='text1'>{this.props.event.event_type} with</h2>
          </div>

          <div className='CenteredContainer'>
            {this.props.event.users.map (u => {
              return <div key={u.id}>
                {this.props.user.id === u.id ?
                  null
                  :
                  <div className='users' key={u.id}>
                    <Image circular size='small' src={u.img_url} />
                    <center><p className='text2'>{u.name}</p></center>
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
                <center><p className='text2'>{p.name}</p></center>
              </div>
            })}
          </div>
          <br/>
          <p className='text2'>{this.getTime()}</p>
          <Icon name='map marker alternate' color='violet' /><p className='text2'>{this.props.event.location}</p>
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
            <EditEventModal event={this.props.event} key={this.props.event.id} user={this.props.user} editEventFetch={this.props.editEventFetch}/>
            <Button basic color='violet' secondary >Delete</Button>
          </div>
        </div>
      )
      :
      null
    )




  }
}

export default EventCard

// onClick={() => this.props.handleDelete(this.state.pet)}

// how to properly embed a google maps - but you need to fix the addresses for this
// <div>
//   <iframe
//     width="450"
//     height="250"
//     frameBorder="0"
//     src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCUhKXh64JWDhIaGsEbRoBam8PAbMSPbK8&q=Green+Lake+Park" >
//   </iframe>
// </div><br />
