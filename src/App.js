import React, { Component } from 'react';
import MessageList from './Components/MessageList'
// import SendMessageForm from './Components/SendMessageForm'
// import RoomList from './Components/RoomList'
// import NewRoomForm from './Components/NewRoomForm'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">

      <MessageList />

      </div>
    );
  }
}

export default App;
