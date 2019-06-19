import React, { Component } from 'react'

//CSS
import '../css/Events.css'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Menu } from 'semantic-ui-react'

const EVENT_URL = 'http://localhost:3000/api/v1/events'

class EventList extends Component {


  getDate = (string) => {
    const date = new Date(string)
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}/${day}: `
  }

  render(){
   return (
      <Menu.Item
        key={this.props.event.id}
        active={this.props.activeItem === this.props.event.id}
        onClick={() => this.props.handleItemClick(this.props.event.id)}
      >
      {this.getDate(this.props.event.start_time) + this.props.event.event_type}
      </Menu.Item>
    )
  }
}

export default EventList


//<p>{this.props.event.event_type} at {this.getDate(this.props.event.start_time)}</p>
