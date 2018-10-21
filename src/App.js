import React, { Component } from 'react';
import './App.css';
import NumberInput from './NumberInput';
import Button from './Button';

// <img src={logo} className="App-logo" alt="logo" />

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
          onChange={(val) => this.setState({ number: val })}
        />
        <ButtonGrid className="digits" rows={['1fr','1fr','1fr','1fr']} cols={['1fr','1fr','1fr']} rowGap={5} colGap={5}>
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
