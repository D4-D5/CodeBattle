import React, { Component } from 'react';
import Chips, { Chip } from 'react-chips'
import { TAGS } from '../constants';

class MyChip extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      chips: []
    }
  }
 
  onChange = chips => {
    this.setState({ chips });
  }
 
  render() {
    return (
      <div>
        <Chips
          value={this.props.chips}
          onChange={this.props.handleChipsChange}
          suggestions={TAGS}
          placeholder="Enter tags (comma separeted)"
        />
      </div>
    );
  }
}
export default MyChip;