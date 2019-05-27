import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import { removeItem, moveItem } from "../../../actions/previewItemsActions";
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
		const { connectDropTarget, hovered, moveItem, previewItems } = this.props;
		const border = hovered ? "1px solid green" : "1px solid white";

		return connectDropTarget(
			<div style={{ height: "100%" }}>
				<h3 className="text-center">Preview</h3>
				<div className="jumbotron h-100" style={{ border }}>
					{previewItems.length === 0 && <h3 className="list-group-item bg-light text-center text-muted">Select / Drop an item from Toolbox</h3>}

					{previewItems.length > 0 &&
						previewItems.map((item, i) => (
							<PreviewItems key={item.id} index={i} id={item.id} removeItem={this.props.removeItem} item={item.element} moveItem={moveItem} />
						))}
				</div>
			</div>
		);
	}
}

export default compose(
	connect(
		state => ({ previewItems: state.previewItems }),
		{ removeItem, moveItem }
	),
	DropTarget(type, {}, collect)
)(Preview);
