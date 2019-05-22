import React, { Component } from 'react';
import defaultItems from './defaultItems';
import ToolbarItem from './ToolbarItem';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: defaultItems()
    };
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h4 className="text-center">Toolbox</h4>
        <ul className="list-group">
          {
            this.state.items.map(item => (
              <ToolbarItem
                data={item}
                key={item.key}
              />
            ))
          }
        </ul>
      </div>
    )
  }
};

export default Toolbar;
