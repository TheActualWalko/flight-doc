import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setHobbsStop } from './actions';
import './App.css';
import HobbsInput from './HobbsInput';
import Button from './Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      inputFocused: false
    };
  }
  render() {
    return (
      <div className="app">
        <svg style={{position: 'fixed', top: -1000}}>
          <defs>
            <linearGradient id="button-highlight-gradient" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(85,173,255,0.15)" />
              <stop offset="100%" stopColor="rgba(0,135,255,0.05)" />
            </linearGradient>
          </defs>
        </svg>
        <HobbsInput
          value={this.props.hobbsStop}
          onChange={this.props.setHobbsStop}
        />
        <footer>
          <Button topRight>Back</Button>
          <Button topLeft className="highlight">Next</Button>
        </footer>
      </div>
    );
  }
}

export default connect(({ hobbsStop }) => ({ hobbsStop }), (dispatch) => ({ setHobbsStop: (hobbsStop) => dispatch(setHobbsStop(hobbsStop)) }))(App);
