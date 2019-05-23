import React, { Component } from 'react';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';

// type, spec and collect are the paramters to the DragSource HOC
const type = props => {
  return 'items'
}

const spec = {
  beginDrag(props) {
    console.log('Dragging: ' + props.data.key)
    return {
      item: props.data.key
    };
  },
  endDrag(props, monitor, component) {
    if(!monitor.didDrop()) return; // return if not dropped in the Preview component
    return props.handleDrop(props.data);
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class ToolbarItem extends Component {
  render() {
    const { isDragging, connectDragSource, data } = this.props;
    return connectDragSource(
      <li style={{cursor: 'pointer' }} className="list-group-item mb-1">
        <i className={classNames(data.icon, 'mr-3')}/>
        {data.name}
      </li>
    )
  }
}

export default DragSource(type, spec, collect)(ToolbarItem);
