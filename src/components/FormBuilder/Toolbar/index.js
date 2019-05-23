import React, { Component } from 'react';
import defaultItems from './defaultItems';
import ToolbarItem from '../ToolbarItem/ToolbarItem';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: defaultItems()
    };
  }

  handleDrop = item => {
    console.log('Dropping: ' + item.key)
  }

  render() {
    return (
      <div>
        <h4 className="text-center">Toolbox</h4>
        <ul className="list-group">
          {
            this.state.items.map(item => (
              <ToolbarItem
                data={item}
                key={item.key}
                handleDrop={(item) => this.handleDrop(item)}
              />
            ))
          }
        </ul>
      </div>
    )
  }
};

export default Toolbar;
