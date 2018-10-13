import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FlightList from './FlightList';
import Flight from './Flight';

// <img src={logo} className="App-logo" alt="logo" />

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'FLIGHT',
      flightID: null,
      flights: [
        {id: 1, description: 'Oct 13 14:03-14:56'}
      ]
    };
  }
  createNewFlight() {
    this.setState({ view: 'FLIGHT' });
  }
  getView() {
    switch (this.state.view) {
      case 'FLIGHT_LIST':
        return <FlightList flights={this.state.flights} createNewFlight={() => this.createNewFlight()}/>
      case 'FLIGHT':
        return <Flight id={this.state.flightID} />
      default:
        throw new Error('Invalid view: ' + this.state.view);
    }
  }
  render() {
    return (
      <div className="app">
        {this.getView()}
      </div>
    );
  }
}

export default App;
