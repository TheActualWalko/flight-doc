import React, { Component } from 'react';
import Button from './Button';
import addSVG from './addSVG';
import arrowUp from './arrow-up.svg';
import arrowDown from './arrow-down.svg';

const TimeReadout = ({time}) => (
  <span className='time-component' ref={(el) => el && addSVG(el, {})}>
    <svg className='border-svg' />
    {(''+time).length === 1 ? `0${time}` : time}
  </span>
);
const getNow = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

class CurrentTime extends Component {
  constructor(props) {
    super(props);
    this.state = { time: getNow() }
  }

  componentDidMount() {
    this.updateInterval = setInterval(() => this.setState({ time: getNow() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    return this.state.time;
  }
}

class TimeInput extends Component {
  setToNow() {
    this.props.onChange(getNow());
  }
  getMinutes() {
    return this.props.value && Number(this.props.value.split(':')[1]);
  }
  getHours() {
    return this.props.value && Number(this.props.value.split(':')[0]);
  }
  modTime(amount) {
    const minutes = (this.getMinutes() + 60 + amount) % 60;
    const hours = (this.getHours() + 24 + Math.floor((this.getMinutes() + amount) / 60)) % 24;
    this.props.onChange(`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
  }
  render() {
    return this.props.value
      ? (
        <div className="time-input">
          <Button onClick={() => this.modTime(60)} topLeft topRight><img src={arrowUp} alt='+ Hours' /></Button>
          <div style={{visibility: 'hidden'}}/>
          <Button onClick={() => this.modTime(1)} topLeft topRight><img src={arrowUp} alt='+ Minutes' /></Button>
          <TimeReadout time={this.getHours()} />
          <div className='time-colon'>:</div>
          <TimeReadout time={this.getMinutes()} />
          <Button onClick={() => this.modTime(-60)} bottomLeft bottomRight><img src={arrowDown} alt='- Hours' /></Button>
          <div style={{visibility: 'hidden'}}/>
          <Button onClick={() => this.modTime(-1)} bottomLeft bottomRight><img src={arrowDown} alt='- Monutes' /></Button>
        </div>
      )
      : (
        <div className="time-now">
          <Button topLeft topRight bottomLeft bottomRight className="time-manual" onClick={() => this.setToNow()}>Select Time</Button>
          <Button topLeft topRight bottomLeft bottomRight className="time-continue highlight" onClick={() => { this.setToNow(); this.props.onContinue(); }}>
            Use Current Time
            <strong><CurrentTime /></strong>
          </Button>
        </div>
      );
  }
}

export default TimeInput;
