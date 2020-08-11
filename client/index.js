import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Input, MessageList } from './components/index';
import faker from 'faker';

const myName = `${faker.name.firstName()} ${faker.name.lastName()}`;

const app = document.querySelector('#app');

class Application extends Component {
  state = {
    socket: null,
    messages: [],
  }

  componentDidMount() {
    try {
      const socket = new WebSocket('ws://localhost:3000/connect');

      socket.onopen = () => {
        console.log('Client connected to socket.');
      };

      socket.onmessage =(m) => {
        const { messages } = this.state;
        const message = JSON.parse(m.data);

        console.log('Message received: ', message);

        this.setState({
          messages: messages.concat({
            ...message,
            timestamp: moment(message.timestamp),
          }),
        });
      };

      this.setState({
        socket,
      });
    } catch (e) {
      console.log('Failed to connect to server.');
      throw e;
    }
  }

  componentWillUnmount() {
    const { socket } = this.state;

    if (socket) {
      socket.close();
    }
  }

  send = (message) => {
    const { socket } = this.state;

    if (socket) {
      socket.send(JSON.stringify({
        content: message,
        timestamp: moment().format(),
        sender: myName,
      }));
    } else {
      throw new Error('Message sent before socket connected.');
    }
  }

  render() {
    const { messages } = this.state;

    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          boxSizing: 'border-box',
          border: 'solid 1px red',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MessageList messages={messages} />
        <Input send={this.send} />
      </div>
    )
  }
}

ReactDOM.render(
  <Application />,
  app,
  () => {
    console.log('Application has rendered!');
  },
);
