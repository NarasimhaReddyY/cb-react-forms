import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';
import DatePicker from 'react-date-picker';

class DatePick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
	}	

  render() {
    const { label, required } = this.props.item;

    return (
      <div>
        <HeaderLabel label={label} required={required} />
        <DatePicker 
          onChange={(date) => this.setState({ date })}
          value={this.state.date}
        />
      </div>
    )
  }
}

export default DatePick;