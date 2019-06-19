import React, { Component } from 'react'

//Semantic
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'

//CSS
import '../css/Welcome.css'

class Login extends Component {

  constructor(){
    super()
    this.state = {

    }
  }

  // Downloads oauth.js from CDN, pretty much like adding external scripts
  componentDidMount () {
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    document.body.appendChild(oauthScript);
  }

  handleClick = (e) => {
    // Prevents page reload
    //e.preventDefault();

    //OAuth takes a second to load and if the button is clicked too quickly then it is not ready and throws and error
    if (window.OAuth) {
      // Initializes OAuth.io with API key
      window.OAuth.initialize('kHem6s_qmpzHUGwxcu5VHFz0orc');

      // Popup Google and ask for authorization
      window.OAuth.popup('google').then((provider) => {
        localStorage.setItem('token', provider.id_token)
        // Prompts 'welcome' message with User's name on successful login
        // Check console logs for additional User info
        provider.me().then((data) => {
          // console.log('name', data.raw.names[0].displayName);
          // console.log('data', data);
          localStorage.setItem('email', data.email)
          localStorage.setItem('name', data.raw.names[0].displayName)
          //image?
        });

      });
      this.sendAuth()
    }

  }
  // put this somwhere that i need save to the database
  // call this again but with the token in the headers whenever I'm updating info
  sendAuth = () => {
   fetch('http://localhost:3000/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       token: localStorage.getItem('token'),
       email: localStorage.getItem('email'),
       name: localStorage.getItem('name')

     })
   })
   .then(resp => resp.json())
   .then(data => {
     this.props.toggleLogIn()
     this.props.setCurrentUser(data)
   })
 }

  render() {
    return (
      <div className='mainContainer'>
        <div className='CenteredContainer'>
          <h2 className='login'>
            Hello, please sign in
          </h2>
        </div>
        <div className='CenteredContainer'>
          <Button basic color='violet' onClick={this.handleClick.bind(this)}>
            Sign in with Google
          </Button>
        </div>
      </div>
    )
  }

}

export default Login
