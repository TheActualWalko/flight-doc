import React from 'react';
import addSVG from './addSVG';

export default ({topLeft, topRight, bottomLeft, bottomRight, children, ...props}) => {
  return (
    <button {...props} ref={(button) => button && addSVG(button, {topLeft, topRight, bottomLeft, bottomRight})}>
      <svg className='border-svg' />
      {children}
    </button>
  );
};
