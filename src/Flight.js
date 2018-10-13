import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './Flight.css';

class Flight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'HOBBS_START',
      holdingDot: false,
      aerodromeFrom: '',
      aerodromeTo: '',
      designation: '',
      pilotInCommand: '',
      otherPerson: '',
      hobbsStart: '',
      hobbsStop: '',
      timeUp: new Date(),
      timeDown: new Date(),
    };
  }
  cleanupDecimalValue(stateParam) {
    if (this.state[stateParam].endsWith('.')) {
      this.state[stateParam] = this.state[stateParam].slice(0,-1);
    }
  }
  renderDecimalInput(stateParam) {
    const makeCharButton = (char) => (
      <button
        className="input-button"
        key={char}
        onClick={() => {
          const currentStr = this.state[stateParam];
          if (char !== '.' || !currentStr.includes('.')) {
            this.setState({ [stateParam]: currentStr + char });
          }
        }}
      >
        {char}
      </button>
    )
    return (
      <div className="decimal-input">
        <span className="readout">{this.state[stateParam]}{this.state.holdingDot ? '.' : ''}</span>
        <button
          className="clear"
          onClick={() => this.setState({[stateParam]: ''})}
        >
          CLR
        </button>
        <div className="buttons">
          {[1,2,3,4,5,6,7,8,9].map(makeCharButton)}
          <div className="button-spacer"></div>
          {[0,'.'].map(makeCharButton)}
        </div>
      </div>
    );
  }
  renderNextButton(label, nextPage, onClick = () => {}) {
    return (
      <button
        className='next-button'
        onClick={() => {
          onClick();
          Promise.resolve(() => {
            this.setState({page: nextPage});
          });
      }}>
        {label + ' >'}
      </button>
    );
  }
  renderBackButton(label, prevPage, onClick = () => {}) {
    return (
      <button
        className='back-button'
        onClick={() => {
          onClick();
          Promise.resolve(() => {
            this.setState({page: prevPage});
          });
      }}>
        {'< ' + label}
      </button>
    );
  }
  renderFlightInfo() {

  }
  renderHobbsStart() {
    return (
      <Fragment>
        <h3>Hobbs Start</h3>
        {this.renderDecimalInput('hobbsStart')}
        {this.renderBackButton('Flight Info', 'FLIGHT_INFO', () => this.cleanupDecimalValue('hobbsStart'))}
        {this.renderNextButton('Time Up', 'TIME_UP', () => this.cleanupDecimalValue('hobbsStart'))}
      </Fragment>
    );
  }
  renderTimeUp() {

  }
  renderTimeDown() {

  }
  renderHobbsStop() {

  }
  renderReview() {

  }
  getPage() {
    return {
      FLIGHT_INFO: this.renderFlightInfo(),
      HOBBS_START: this.renderHobbsStart(),
      TIME_UP: this.renderTimeUp(),
      TIME_DOWN: this.renderTimeDown(),
      HOBBS_STOP: this.renderHobbsStop(),
      REVIEW: this.renderReview()
    }[this.state.page]
  }
  render() {
    return (
      <div className="flight">
        {this.getPage()}
      </div>
    );
  }
}

export default Flight;
