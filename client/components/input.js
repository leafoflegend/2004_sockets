import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  state = {
    message: '',
  }

  handleChange = ({ target: { value }}) => {
    this.setState({
      message: value,
    });
  }

  sendMessage = () => {
    const { send } = this.props;
    const { message } = this.state;

    this.setState({
      message: '',
    }, () => send(message));
  }

  render() {
    const { message } = this.state;

    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <textarea
          style={{
            resize: 'none',
            maxHeight: '6em',
            height: '50px',
            flexGrow: 1,
          }}
          onChange={this.handleChange}
          value={message}
        />
        <button onClick={this.sendMessage}>
          Send
        </button>
      </div>
    )
  }
}

Input.propTypes = {
  send: PropTypes.func.isRequired,
};

export default Input;
