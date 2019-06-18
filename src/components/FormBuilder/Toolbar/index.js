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
        <h3 className="text-center mt-3" style={{ height: '50px', margin: 0 }}>Toolbox</h3>
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
