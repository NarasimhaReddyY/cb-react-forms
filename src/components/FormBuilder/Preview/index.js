import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import { isEmpty } from 'lodash';
import { removeItem, dragItem } from "../../../actions/previewItemsActions";
import PreviewItems from "../PreviewItems";

// DropTarget parameters
const type = props => {
	return "items";
};

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		item: monitor.getItem()
	};
};

class Preview extends Component {
	render() {
    const {
      connectDropTarget,
      hovered,
      dragItem,
      previewItems 
    } = this.props;

		const border = hovered ? "1px solid green" : "1px solid white";

		return connectDropTarget(
			<div style={{ height: "100%" }}>
				<h3 className="text-center">Preview</h3>
				<div className="jumbotron h-100" style={{ border }}>
					{
            isEmpty(previewItems) && 
            <h3 className="list-group-item bg-light text-center text-muted">
              Select / Drop an item from Toolbox
            </h3>
          }
          
					{
            !isEmpty(previewItems) &&
						previewItems.map((item, i) => (
              <PreviewItems 
                key={item.id} 
                index={i} 
                id={item.id} 
                removeItem={this.props.removeItem} 
                item={item}
                dragItem={dragItem}
              />
            ))
          }
				</div>
			</div>
		);
	}
}

export default compose(
	connect(
		state => ({ 
      previewItems: state.previewItems 
    }), { 
      removeItem, dragItem 
    }
	),
	DropTarget(type, {}, collect)
)(Preview);

