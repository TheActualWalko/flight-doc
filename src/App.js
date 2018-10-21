import React, { Component } from 'react';
import './App.css';

const BORDER_CORNER_RADIUS = 10;

// <img src={logo} className="App-logo" alt="logo" />

const addSVG = (element, corners) => {
  const {topLeft, topRight, bottomLeft, bottomRight} = corners;
  element.setAttribute('data-corners', JSON.stringify(corners));
  const height = element.offsetHeight;
  const width = element.offsetWidth;
  const points = [];
  topLeft
    ? points.push([0.5, BORDER_CORNER_RADIUS + 0.5], [BORDER_CORNER_RADIUS + 0.5, 0.5])
    : points.push([0.5,0.5]);
  topRight
    ? points.push([width - (BORDER_CORNER_RADIUS + 0.5), 0.5], [width - 0.5, BORDER_CORNER_RADIUS + 0.5])
    : points.push([width - 0.5, 0.5]);
  bottomRight
    ? points.push([width - 0.5, height - (BORDER_CORNER_RADIUS + 0.5)], [width - (BORDER_CORNER_RADIUS + 0.5), height - 0.5])
    : points.push([width - 0.5, height - 0.5]);
  bottomLeft
    ? points.push([BORDER_CORNER_RADIUS - 0.5, height - 0.5], [0.5, height - (BORDER_CORNER_RADIUS + 0.5)])
    : points.push([0.5, height - 0.5]);
  topLeft
    ? points.push([0.5, BORDER_CORNER_RADIUS + 0.5])
    : points.push([0.5, 0.5]);
  const path = `
    <path d="${points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')}"></path>
  `;
  element.querySelector('.border-svg').innerHTML = path;
}

window.addEventListener('resize', () => {
  [...document.querySelectorAll('[data-corners]')].forEach(el => {
    if (el) {
      addSVG(el, JSON.parse(el.getAttribute('data-corners')));
    }
  });
});

const Button = ({topLeft, topRight, bottomLeft, bottomRight, children, ...props}) => {
  return (
    <button {...props} ref={(button) => button && addSVG(button, {topLeft, topRight, bottomLeft, bottomRight})}>
      <svg className='border-svg'>
      </svg>
      {children}
    </button>
  );
};

const ButtonGrid = ({rows, cols, rowGap, colGap, children, ...props}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: cols.join(' '),
      gridTemplateRows: rows.join(' '),
      gridRowGap: rowGap,
      gridColumnGap: colGap,
    }} {...props}>
      {children}
    </div>
  );
};

const NumberInput = ({val, onChange, onFocus, type, topLeft, topRight, bottomLeft, bottomRight}) => {
  return (
    <div className='number-input' ref={(div) => div && addSVG(div, {topLeft, topRight, bottomLeft, bottomRight})}>
      <input type={type} value={val} onChange={(e) => {onChange(e.target.value)}} onFocus={onFocus} />
      <svg className='border-svg'>
      </svg>
      <button onClick={() => onChange('')}>Clr</button>
    </div>
  );
}

const getCorners = (cornerString) => {
  const output = {};
  if (cornerString.includes('tl')) {
    output.topLeft = true;
  }
  if (cornerString.includes('tr')) {
    output.topRight = true;
  }
  if (cornerString.includes('bl')) {
    output.bottomLeft = true;
  }
  if (cornerString.includes('br')) {
    output.bottomRight = true;
  }
  return output;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      inputFocused: false
    };
  }
  render() {
    const appendDigit = (d) => {
      if (this.state.number.includes('.') && d === '.') {
        return;
      }
      this.setState({
        inputFocused: false,
        number: `${this.state.number}${d}`
      });
    };
    const corners = [
      'tl','','tr',
      '',  '',  '',
      'bl','',  '',
      '','bl','br',
    ];
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
        <NumberInput
          topLeft
          topRight
          bottomLeft
          bottomRight
          val={this.state.number}
          type={this.state.inputFocused ? 'number' : 'text'}
          onChange={(val) => this.setState({ number: val })}
          onFocus={() => this.setState({ inputFocused: true, number: this.state.number.endsWith('.') ? '' : this.state.number })}
        />
        <ButtonGrid className="digits" rows={['auto','auto','auto','auto']} cols={['auto','auto','auto']} rowGap={5} colGap={5}>
          {[1,2,3,4,5,6,7,8,9,null,0,'.'].map(
            (digit, index) => digit === null
              ? <button key={`spacer-${index}`} disabled style={{visibility: 'hidden'}}/>
              : <Button key={digit} onClick={() => appendDigit(digit)} {...getCorners(corners[index])}>{digit}</Button>
          )}
        </ButtonGrid>
        <footer>
          <Button topRight>Back</Button>
          <Button topLeft className="highlight">Next</Button>
        </footer>
      </div>
    );
  }
}

export default App;
