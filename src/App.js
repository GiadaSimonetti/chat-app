import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './Components/MessageList';
import SendMessageForm from './Components/SendMessageForm';
import RoomList from './Components/RoomList';
import NewRoomForm from './Components/NewRoomForm';
import './App.css';

import { tokenUrl, instanceLocator } from './config'

class App extends Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
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
        this.currentUser = currentUser;

            this.getRooms();
            this.subscribeToRoom();
      })
      .catch(err => console.log('error on connecting: ', err));
  }

  subscribeToRoom(){
    this.currentUser.subscribeToRoom({
        roomId: 11325949,
        hooks: {
            onNewMessage: message => {
                console.log('message.text: ', message.text);
                this.setState({
                  messages: [...this.state.messages, message]
                });
            }
        }
    });
  }

  getRooms(){
    this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
          this.setState({
              joinableRooms,
              joinedRooms: this.currentUser.rooms
          })
        })
        .catch(err => console.log('error on joinableRooms: ', err));
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: 11325949
    });
  }

  render() {
    console.log('this.state.messages:', this.state.messages);
    return (
      <div className="app">

      <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
      <MessageList messages = {this.state.messages} />
      <SendMessageForm sendMessage={this.sendMessage} />
      <NewRoomForm/>

      </div>
    );
  }
}

export default App;
