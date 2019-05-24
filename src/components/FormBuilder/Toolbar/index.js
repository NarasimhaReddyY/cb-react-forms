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

  render() {
    return (
      <>
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
      </>
    )
  }
};

export default Toolbar;
