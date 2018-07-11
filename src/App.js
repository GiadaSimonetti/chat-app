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
      roomId: null,
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
      })
      .catch(err => console.log('error on connecting: ', err));
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

  subscribeToRoom(roomId){
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
            onNewMessage: message => {
                console.log('message.text: ', message.text);
                this.setState({
                  messages: [...this.state.messages, message]
                });
            }
        }
    })
    .then(room => {
      this.setState({
          roomId: room.id
      })
      this.getRooms()
    })
    .catch(err => console.log('error on subscribing to room: ', err))
  }


  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  render() {
    console.log('this.state.messages:', this.state.messages);
    return (
      <div className="app">

      <RoomList
        subscribeToRoom={this.subscribeToRoom}
        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
      />
      <MessageList messages = {this.state.messages} />
      <SendMessageForm sendMessage={this.sendMessage} />
      <NewRoomForm/>

      </div>
    );
  }
}

export default App;
