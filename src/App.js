import React, { Component } from 'react';
// import { ChatManager, TokenProvider } from '@pusher/chatkit'
import Chatkit from '@pusher/chatkit'
import MessageList from './Components/MessageList'
// import SendMessageForm from './Components/SendMessageForm'
// import RoomList from './Components/RoomList'
// import NewRoomForm from './Components/NewRoomForm'
import './App.css';

import { tokenUrl, instanceLocator } from './config'

class App extends Component {

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
                  }
              }
          })
      })
  }

  render() {
    return (
      <div className="app">

      <MessageList />

      </div>
    );
  }
}

export default App;
