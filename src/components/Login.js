import React, { Component } from 'react'

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
    e.preventDefault();

    // Initializes OAuth.io with API key
    // Sign-up an account to get one
    window.OAuth.initialize('kHem6s_qmpzHUGwxcu5VHFz0orc');

    // Popup Github and ask for authorization
    window.OAuth.popup('google').then((provider) => {
      localStorage.setItem('token', provider.id_token)
      // Prompts 'welcome' message with User's name on successful login
      // Check console logs for additional User info
      provider.me().then((data) => {
        console.log("data: ", data);
        localStorage.setItem('user', data)
      });

    });
    this.sendAuth()
  }
  // put this somwhere that i need save to the database
  // call this again but with the token in the headers whenever I'm updating info
  sendAuth = () => {
   fetch('http://localhost:3000/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({token: localStorage.getItem('token')})
   })
 }

  render() {
    return <a href="" onClick={this.handleClick.bind(this)}>
              Sign in with Google
           </a>;
  }

}

export default Login
