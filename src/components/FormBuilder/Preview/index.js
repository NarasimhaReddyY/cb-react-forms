import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const type = props => {
  return "items";
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  }
}

class Preview extends Component {
  render() {
    const { connectDropTarget, hovered, item } = this.props;
    
    const borderColor = hovered ? '1px solid green' : '1px solid white'
    
    return connectDropTarget(
      <div style={{ height: '100%'}}>
        <h3 className="text-center">Preview</h3>
        <div className="jumbotron h-100" style={{ border: borderColor }}>
          <h3 className="list-group-item bg-light text-center text-muted">
            Select / Drop an item from Toolbox
          </h3>
        </div>
      </div>
    )
  }
}

export default DropTarget(type, {}, collect)(Preview);