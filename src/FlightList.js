import React from 'react';
import './FlightList.css';

export default ({flights, createNewFlight, selectFlight}) => (
  <div className='flight-list'>
    <header></header>
    <ol>
      {flights.map(({id, description}) => <li onClick={() => selectFlight(id)}>{description}</li>)}
    </ol>
    <footer>
      <button onClick={() => createNewFlight()}>Start Flight</button>
    </footer>
  </div>
)
