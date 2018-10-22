import React from 'react';
import { connect } from 'react-redux';
import { getDeltaHours } from './tools';

const Report = ({
  timeUp,
  timeDown,
  deltaHours,
  hobbsStart,
  hobbsStop,
  active
}) => (
  <dl className={`report ${active ? '' : 'inactive'}`}>
    <dt>Time Up</dt>
    <dd>{timeUp}</dd>

    <dt>Time Down</dt>
    <dd>{timeDown}</dd>

    <dt className='conclusion'>Air Time</dt>
    <dd className='conclusion'>{deltaHours}</dd>


    <dt>Hobbs Start</dt>
    <dd>{hobbsStart}</dd>

    <dt>Hobbs Stop</dt>
    <dd>{hobbsStop}</dd>

    <dt className='conclusion'>Engine-On Time</dt>
    <dd className='conclusion'>{(hobbsStop - hobbsStart).toFixed(1)}</dd>
  </dl>
);

const mapStateToProps = ({ timeUp, timeDown, hobbsStart, hobbsStop }) => ({
  timeUp,
  timeDown,
  deltaHours: getDeltaHours(timeUp, timeDown).toFixed(1),
  hobbsStart,
  hobbsStop,
});

export default connect(mapStateToProps)(Report);
