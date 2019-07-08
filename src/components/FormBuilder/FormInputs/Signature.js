import React, { Component } from 'react';
import CanvasDraw from 'react-canvas-draw';
import HeaderLabel from "./HeaderLabel";

class Signature extends Component {

	componentDidMount() {
		if(this.props.defaultValue) {
			this.saveableCanvas.loadSaveData(this.props.defaultValue);
		}
	}
	
	render() {
		const { 
			item,
			meta,
			width, 
			input,
			height,
			readOnly, 
			showError,
			generator, 
		 } = this.props;
		return (
			<div>
        {
					!generator &&
					<React.Fragment>
						<HeaderLabel label={item.label} required={item.required} />
						<p className="py-3 px-3 bg-dark rounded text-white d-block">Signature</p>
					</React.Fragment>
				}
				{
					generator &&
					<React.Fragment>
						<CanvasDraw 
							ref={canvasDraw => {
								this.saveableCanvas = canvasDraw;
							}}
							canvasHeight={height}
							className="border rounded"
							canvasWidth={width}
							catenaryColor="#aaa"
							brushRadius={6}
							brushColor='#444'
							hideGrid={true}
							disabled={readOnly}
						/>
						<div>{showError(meta.touched, meta.error, meta.warning)}</div>
						{
							!readOnly &&
							<React.Fragment>
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
					</React.Fragment>
				}
			</div>
		)
	}
}

Signature.defaultProps = {
	generator: false,
	readOnly: false,
	defaultValue: null
}

export default Signature;