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
    const { items } = this.state;
    return (
      <>
        <h4 className="text-center">Toolbox</h4>
        <ul className="list-group">
          {
            items.map(item => (
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
