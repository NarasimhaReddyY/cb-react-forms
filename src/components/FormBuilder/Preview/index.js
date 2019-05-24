import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { removeItem } from '../../../actions/previewItemsActions';

const type = props => {
  return "items"
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
    const { connectDropTarget, hovered, item, previewItems } = this.props;
    
    const border = hovered ? '1px solid green' : '1px solid white'
    
    return connectDropTarget(
      <div style={{ height: '100%'}}>
        <h3 className="text-center">Preview</h3>
        <div className="jumbotron h-100" style={{ border }}>
          {
            previewItems.length === 0 && 
            (
              <h3 className="list-group-item bg-light text-center text-muted">
                Select / Drop an item from Toolbox
              </h3>
            )
          }

          {
            previewItems.length > 0 && (
              previewItems.map((item, i) => (
                <div className="list-group-item mb-1" key={item + i}>
                  <span onClick={() => this.props.removeItem(i)}><i className="fa fa-times"></i> </span>
                  {item}
                </div>
              ))
            )
          }
        </div>
      </div>
    )
  }
}

export default compose(
  connect(state => ({ previewItems: state.previewItems }), { removeItem }),
  DropTarget(type, {}, collect)
)(Preview)