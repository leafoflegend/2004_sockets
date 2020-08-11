import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  render() {
    const { message } = this.props;

    const { timestamp, sender, content } = message;

    return (
      <div
        style={{
          borderBottom: 'solid 1px gray',
          padding: '5px',
          display: 'flex',
        }}
      >
        <span
          style={{
            color: 'gray',
          }}
        >
          { timestamp.format('HH:mm:ss') }&nbsp;&nbsp;
        </span>
        <span
          style={{
            color: 'blue',
            fontWeight: 'bold',
          }}
        >
          { sender }:&nbsp;&nbsp;
        </span>
        <span
          style={{
            color: 'black',
          }}
        >
          { content }
        </span>
      </div>
    )
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    timestamp: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}

class MessageList extends Component {
  render() {
    const { messages } = this.props;

    return (
      <div
        style={{
          flexGrow: 1,
          width: '100%',
        }}
      >
        {
          messages.map(m => <Message key={m.id} message={m} />)
        }
      </div>
    )
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.object.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}

export default MessageList;
