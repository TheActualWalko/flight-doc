import React from 'react';

export default ({rows, cols, rowGap, colGap, children, getRef, ...props}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: cols.join(' '),
      gridTemplateRows: rows.join(' '),
      gridRowGap: rowGap,
      gridColumnGap: colGap,
    }}
    ref={getRef}
    {...props}>
      {children}
    </div>
  );
};
