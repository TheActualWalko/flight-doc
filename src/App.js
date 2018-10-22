import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setHobbsStart, setHobbsStop, setTimeUp, setTimeDown, next, prev } from './actions';
import './App.css';
import HobbsInput from './HobbsInput';
import TimeInput from './TimeInput';
import Button from './Button';
import Report from './Report';
import { canGoToPage, getNextPage } from './pages';
import motor from './motor.svg';
import wheels from './wheels.svg';

const getTitle = (page) => ({
  HOBBS_START: 'Hobbs Start',
  HOBBS_STOP: 'Hobbs Stop',
  TIME_UP: 'Time Up',
  TIME_DOWN: 'Time Down',
  REPORT: 'Report'
}[page]);


const getIcon = (page) => ({
  HOBBS_START: 'MOTOR',
  HOBBS_STOP: 'MOTOR',
  TIME_UP: 'WHEELS',
  TIME_DOWN: 'WHEELS',
  REPORT: 'MOTOR'
}[page]);

class App extends Component {
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
        <header>
          <h3>{getTitle(this.props.page)}</h3>
          <img className='header-image motor' src={motor} alt={getTitle(this.props.page)} style={{ visibility: getIcon(this.props.page) === 'WHEELS' && 'hidden' }}/>
          <img className='header-image wheels' src={wheels} alt={getTitle(this.props.page)} style={{ visibility: getIcon(this.props.page) === 'MOTOR' && 'hidden' }}/>
        </header>
        <main>
          <HobbsInput value={this.props.hobbsStart} onChange={this.props.setHobbsStart} active={this.props.page === 'HOBBS_START'} />
          <TimeInput value={this.props.timeUp} onChange={this.props.setTimeUp} onContinue={this.props.next} active={this.props.page === 'TIME_UP'} />
          <TimeInput value={this.props.timeDown} onChange={this.props.setTimeDown} onContinue={this.props.next} active={this.props.page === 'TIME_DOWN'} />
          <HobbsInput value={this.props.hobbsStop} onChange={this.props.setHobbsStop} active={this.props.page === 'HOBBS_STOP'} />
          <Report active={this.props.page === 'REPORT'} />
        </main>
        <footer>
          {<Button onClick={this.props.prev} topRight disabled={!this.props.canGoToPrev} className={this.props.canGoToPrev ? 'back' : 'back disabled'}>Back</Button>}
          {<Button onClick={this.props.next} topLeft disabled={!this.props.canGoToNext} className={this.props.canGoToNext ? 'highlight' : 'disabled'}>Next</Button>}
        </footer>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    hobbsStart: state.hobbsStart,
    hobbsStop: state.hobbsStop,
    timeUp: state.timeUp,
    timeDown: state.timeDown,
    page: state.page,
    canGoToPrev: state.page !== 'HOBBS_START',
    canGoToNext: state.page !== 'REPORT' && canGoToPage(state, getNextPage(state))
  }),
  (dispatch) => ({
    setHobbsStart: (hobbsStart) => dispatch(setHobbsStart(hobbsStart)),
    setHobbsStop: (hobbsStop) => dispatch(setHobbsStop(hobbsStop)),
    setTimeUp: (hobbsStart) => dispatch(setTimeUp(hobbsStart)),
    setTimeDown: (hobbsStop) => dispatch(setTimeDown(hobbsStop)),
    next: () => dispatch(next()),
    prev: () => dispatch(prev())
  })
)(App);
