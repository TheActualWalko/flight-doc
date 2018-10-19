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
      timeUp: null,
      timeDown: null,
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
  renderTimeInput(stateParam, title, onSaveTime = () => {}) {
    const current = this.state[stateParam];
    const hoursUp = () => this.setState({[stateParam]: new Date(current.getTime() + (60*60*1000))});
    const hoursDown = () => this.setState({[stateParam]: new Date(current.getTime() - (60*60*1000))});
    const minutesUp = () => this.setState({[stateParam]: new Date(current.getTime() + (60*1000))});
    const minutesDown = () => this.setState({[stateParam]: new Date(current.getTime() - (60*1000))});
    const saveTime = () => {
      this.setState({[stateParam]: new Date()})
      onSaveTime();
    };
    if (current === null) {
      return <button key={stateParam} className='save-time-button' onClick={saveTime}>Save {title}</button>
    }
    return (
      <div className="time-input">
        <button onClick={hoursUp}>⬆</button>
        <span></span>
        <button onClick={minutesUp}>⬆</button>
        <span className='hours'>{current.getHours()}</span>
        <span className='colon'>:</span>
        <span className='minutes'>{current.getMinutes()}</span>
        <button onClick={hoursDown}>⬇</button>
        <span></span>
        <button onClick={minutesDown}>⬇</button>
      </div>
    )
  }
  renderNextButton(label, nextPage, onClick = () => {}) {
    return (
      <button
        className='next-button'
        onClick={() => {
          onClick();
          this.setState({page: nextPage});
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
          this.setState({page: prevPage});
      }}>
        {'< ' + label}
      </button>
    );
  }
  renderHobbsStart() {
    const hasHobbsStart = this.state.hobbsStart.includes('.') && this.state.hobbsStart.indexOf('.') < this.state.hobbsStart.length - 1;
    return (
      <Fragment>
        <h3>Hobbs Start</h3>
        {this.renderDecimalInput('hobbsStart')}
        {hasHobbsStart && this.renderNextButton('Time Up', 'TIME_UP', () => this.cleanupDecimalValue('hobbsStart'))}
      </Fragment>
    );
  }
  renderTimeUp() {
    return (
      <Fragment>
        <h3>Time Up</h3>
        {this.renderTimeInput('timeUp', 'Time Up', () => this.setState({ page: 'TIME_DOWN' }))}
        {this.renderBackButton('Hobbs Start', 'HOBBS_START')}
        {this.state.timeUp !== null && this.renderNextButton('Time Down', 'TIME_DOWN', () => this.cleanupDecimalValue('hobbsStart'))}
      </Fragment>
    )
  }
  renderTimeDown() {
    return (
      <Fragment>
        <h3>Time Down</h3>
        {this.renderTimeInput('timeDown', 'Time Down', () => this.setState({ page: 'HOBBS_STOP' }))}
        {this.renderBackButton('Time Up', 'TIME_UP')}
        {this.state.timeDown !== null && this.renderNextButton('Hobbs Stop', 'HOBBS_STOP')}
      </Fragment>
    );
  }
  renderHobbsStop() {
    if (this.state.hobbsStop === '') {
      this.setState({
        hobbsStop: (0.1 + Number(this.state.hobbsStart) + ((new Date().getTime() - this.state.timeUp.getTime()) / (60*60*1000))).toFixed(1)
      });
    }
    return (
      <Fragment>
        <h3>Hobbs Stop</h3>
        {this.renderDecimalInput('hobbsStop')}
        {this.renderBackButton('Time Down', 'TIME_DOWN', () => this.cleanupDecimalValue('hobbsStop'))}
        {this.state.hobbsStop !== '' && this.renderNextButton('Review', 'REVIEW', () => this.cleanupDecimalValue('hobbsStop'))}
      </Fragment>
    );
  }
  renderReview() {
    const printTime = (date) => date ? date.toTimeString().slice(0,5) : 'Not Recorded';
    let engineOn;
    while (this.state.hobbsStop.length > this.state.hobbsStart.length) {
      this.state.hobbsStart = '0' + this.state.hobbsStart;
    }
    while (this.state.hobbsStart.length > this.state.hobbsStop.length) {
      this.state.hobbsStop = '0' + this.state.hobbsStop;
    }
    engineOn = this.state.hobbsStop - this.state.hobbsStart;
    if (engineOn < 0) {
      engineOn += Math.pow(10, this.state.hobbsStop.indexOf('.'));
    }
    return (
      <Fragment>
        <h3>Review</h3>
        <dl>
          <dt>Hobbs Start</dt>
          <dd>{this.state.hobbsStart}</dd>
          <dt>Hobbs Stop</dt>
          <dd>{this.state.hobbsStop}</dd>
          <dt>Engine-On Time</dt>
          <dd>{(engineOn).toFixed(1)}</dd>
          <dt>Time Up</dt>
          <dd>{printTime(this.state.timeUp)}</dd>
          <dt>Time Down</dt>
          <dd>{printTime(this.state.timeDown)}</dd>
          <dt>Flight Time</dt>
          <dd>{((this.state.timeDown.getTime() - this.state.timeUp.getTime()) / (60*60*1000)).toFixed(1)}</dd>
        </dl>
        {this.renderBackButton('Hobbs Stop', 'HOBBS_STOP')}
      </Fragment>
    );
  }
  getPage() {
    return {
      HOBBS_START: () => this.renderHobbsStart(),
      TIME_UP: () => this.renderTimeUp(),
      TIME_DOWN: () => this.renderTimeDown(),
      HOBBS_STOP: () => this.renderHobbsStop(),
      REVIEW: () => this.renderReview()
    }[this.state.page]()
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
