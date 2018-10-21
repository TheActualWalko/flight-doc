import React, { Component } from 'react';
import NumberInput from './NumberInput';
import Button from './Button';

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
const corners = [
  'tl','','tr',
  '',  '',  '',
  'bl','',  '',
  '','bl','br',
].map(getCorners);

class HobbsInput extends Component {
  constructor(props) {
    super(props);
    this.state = { inputFocused: false };
  }
  appendDigit(digit) {
      if (this.props.value.includes('.') && digit === '.') {
        return;
      } else if (this.props.value.indexOf('.') >= 0 && this.props.value.indexOf('.') < this.props.value.length - 1) {
        return;
      }
      this.setState({ inputFocused: false });
      this.props.onChange(`${this.props.value}${digit}`);
  }
  render() {
    return (
      <div className="hobbs-input">
        <NumberInput
          topLeft
          topRight
          bottomLeft
          bottomRight
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <div className="digits">
          {[1,2,3,4,5,6,7,8,9,null,0,'.'].map(
            (digit, index) => digit === null
              ? <button key={`spacer-${index}`} disabled style={{visibility: 'hidden'}}/>
              : <Button key={digit} onClick={() => this.appendDigit(digit)} {...corners[index]}>{digit}</Button>
          )}
        </div>
      </div>
    );
  }
}

export default HobbsInput;
