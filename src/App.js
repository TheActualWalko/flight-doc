import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setHobbsStart, setHobbsStop, setTimeUp, setTimeDown, next, prev } from './actions';
import './App.css';
import HobbsInput from './HobbsInput';
import TimeInput from './TimeInput';
import Button from './Button';
import { canGoToPage, getNextPage } from './pages';

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
        {this.props.page === 'HOBBS_START' && <HobbsInput value={this.props.hobbsStart} onChange={this.props.setHobbsStart} />}
        {this.props.page === 'TIME_UP' && <TimeInput value={this.props.timeUp} onChange={this.props.setTimeUp} onContinue={this.props.next} />}
        {this.props.page === 'TIME_DOWN' && <TimeInput value={this.props.timeDown} onChange={this.props.setTimeDown} onContinue={this.props.next} />}
        {this.props.page === 'HOBBS_STOP' && <HobbsInput value={this.props.hobbsStop} onChange={this.props.setHobbsStop} />}
        <footer>
          <Button onClick={this.props.prev} topRight>Back</Button>
          <Button onClick={this.props.next} topLeft disabled={!this.props.canGoToNext} className={this.props.canGoToNext ? 'highlight' : 'disabled'}>Next</Button>
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
    canGoToNext: canGoToPage(state, getNextPage(state))
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
