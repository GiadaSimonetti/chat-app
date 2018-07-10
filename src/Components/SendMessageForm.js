import React from 'react'

class SendMessageForm extends React.Component {

  constructor() {
    super();
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    console.log(e.target.value);
    this.setState({
      message: e.target.value
    })
  }


  render() {
    console.log(this.state.message)
      return (
          <form className="send-message-form">
              <input
                  onChange={this.handleChange}
                  value={this.state.message}
                  placeholder="Type your message and hit ENTER"
                  type="text" />
          </form>
      )
  }
}

export default SendMessageForm
