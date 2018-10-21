import React, { Component } from 'react';
import addSVG from './addSVG';
import Button from './Button';

class NumberInput extends Component {
  isFocused() {
    return this.inputRef === document.activeElement;
  }
  getType() {
    return this.isFocused() ? 'number' : 'text';
  }
  render() {
    const {onChange, value, topLeft, topRight, bottomLeft, bottomRight} = this.props;
    let hadFocus = this.isFocused();
    return (
      <div className='number-input' ref={(div) => div && this.inputRef && addSVG(div, {topLeft, bottomLeft}, this.inputRef)}>
        <input
          type={this.getType()}
          value={value}
          onChange={(e) => /^\d*\.?\d?$/.test(e.target.value) && onChange(e.target.value)}
          onFocus={() => onChange(value.endsWith('.') ? '' : value)}
          onBlur={() => setTimeout(() => hadFocus = false)}
          ref={(el) => this.inputRef = el}
        />
        <svg className='border-svg' />
        <Button
          onClick={() => {
            onChange('');
            if (hadFocus) setTimeout(() => this.inputRef.focus(), 0);
          }}
          topRight={topRight}
          bottomRight={bottomRight}
        >
          Clr
        </Button>
      </div>
    );
  }
}

export default NumberInput;
