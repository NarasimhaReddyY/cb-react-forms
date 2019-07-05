import React, { Component } from 'react';
import CanvasDraw from 'react-canvas-draw';
import HeaderLabel from "./HeaderLabel";

class Signature extends Component {

	render() {
		const { 
			width, 
			height, 
			showError,
			generator, 
			input,
			meta,
		 } = this.props;
		return (
			<div>
        {
					!generator &&
					<React.Fragment>
						<HeaderLabel label={this.props.item.label} required={this.props.item.required} />
						<p className="py-3 px-3 bg-dark rounded text-white d-block">Signature</p>
					</React.Fragment>
				}
				{
					generator &&
					<React.Fragment>
						<CanvasDraw 
							ref={canvasDraw => {
								this.saveableCanvas = canvasDraw;
								this.loadableCanvas = canvasDraw;
							}}
							canvasHeight={height}
							canvasWidth={width}
							catenaryColor="#aaa"
							brushRadius={6}
							brushColor='#444'
							hideGrid={true}
						/>
						<div>
							{
								showError(meta.touched, meta.error, meta.warning)
							}
						</div>
						<div>
							<button
								type="button"
								className="btn btn-sm btn-primary m-2"
								onClick={() => {
									input.onChange(this.saveableCanvas.getSaveData());
								}}
							>
								Save
							</button>
							<button
								type="button"
								className="btn btn-sm btn-danger m-2"
								onClick={() => {
									this.saveableCanvas.clear();
									input.onChange('');
								}}
							>
								Clear
							</button>
							<button
								type="button"
								className="btn btn-sm btn-secondary m-2"
								onClick={() => {
									this.saveableCanvas.undo();
								}}
							>
								Undo
							</button>
						</div>
						<div>
							<small className="text-sm">* press Save to save your Signature</small>
						</div>
					</React.Fragment>
				}
			</div>
		)
	}
}

Signature.defaultProps = {
	generator: false,
}

export default Signature;