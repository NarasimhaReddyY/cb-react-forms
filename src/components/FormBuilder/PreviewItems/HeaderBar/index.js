import React, { Component } from 'react';

class HeaderBar extends Component {
  render() {
    const { 
      item, 
      removeItem, 
      id 
    } = this.props;

    return (
      <div>
        <span>{item.element}</span>
        { 
          item.required 
          ? <span className="ml-1 badge badge-danger">Required</span>
          : null
        }
        <span onClick={() => removeItem(id)} className="float-right onHover">
          <i className="fa fa-trash-o" />
        </span>
        <span className="float-right onHover">
          <i className="fa fa-edit mr-3"/>
        </span>
      </div>
    )
  }
}

export default HeaderBar;