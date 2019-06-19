import React, { Component } from 'react'

//CSS
import '../css/Welcome.css'


class Welcome extends Component {

  constructor(){
    super()
    this.state = {

    }
  }

  render(){
    return (
      <div className='mainContainer'>
        <div className='CenteredContainer'>
          <h1 className='welcome'>Welcome to<br/>Pet Connect</h1>
        </div>
      </div>
    )
  }
}

export default Welcome
