import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit'
import MessageList from './Components/MessageList'
import SendMessageForm from './Components/SendMessageForm'
// import RoomList from './Components/RoomList'
// import NewRoomForm from './Components/NewRoomForm'
import './App.css';

import { tokenUrl, instanceLocator } from './config'

class App extends Component {

  constructor() {
    super();
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
      const chatManager = new Chatkit.ChatManager({
          instanceLocator,
          userId: 'giada',
          tokenProvider: new Chatkit.TokenProvider({
              url: tokenUrl
          })
      })

      chatManager.connect()
      .then(currentUser => {
          currentUser.subscribeToRoom({
              roomId: 11325949,
              hooks: {
                  onNewMessage: message => {
                      console.log('message.text: ', message.text);
                      this.setState({
                        messages: [...this.state.messages, message]
                      })
                  }
              }
          })
      })
  }

  render() {
    console.log('this.state.messages:', this.state.messages);
    return (
      <div className="app">

      <MessageList messages = {this.state.messages}/>
      <SendMessageForm />

      </div>
    );
  }
}

export default App;
