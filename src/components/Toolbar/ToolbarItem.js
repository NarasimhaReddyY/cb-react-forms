import React, { Component } from 'react';
import classNames from 'classnames';

class ToolbarItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <li className="list-group-item mb-1">
          <i className={classNames(data.icon, 'mr-2')}/>
          {data.name}
        </li> 
      </div>
    )
  }
}

export default ToolbarItem
