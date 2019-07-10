import React, { Component } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import HeaderLabel from "./HeaderLabel";

class Signature extends Component {
	
	render() {
		const { 
			item,
			meta,
			input,
			required,
			formInput, 
			readOnly, 
			generator, 
			showError,
		 } = this.props;

		return (
			<div>
				<React.Fragment>
					<HeaderLabel 
						label={generator ? formInput.label : item.label} 
						required={generator ? required : item.required} 
						readOnly={readOnly}
					/>
					{
						!generator 
							? <p className="py-3 px-3 bg-dark rounded text-white d-block">Signature</p>
							: <React.Fragment>
									<SignatureCanvas 
										ref={(ref) => { this.sigCanvas = ref }}
										penColor="blue"
										canvasProps={{
											width: formInput.width,
											height: formInput.height,
											className: "sigCanvas"
										}}
									/>
									<div>{showError(meta.touched, meta.error, meta.warning)}</div>
									{
										!readOnly &&
										<React.Fragment>
											<div>
												<button
													type="button"
													className="btn btn-sm btn-primary m-2"
													disabled={input.value !== ""}
													onClick={() => {
														input.onChange(this.sigCanvas.toDataURL());
													}}
												>
													Finalise
												</button>
												<button
													type="button"
													className="btn btn-sm btn-danger m-2"
													onClick={() => {
														this.sigCanvas.clear();
														input.onChange('');
													}}
												>
													Clear
												</button>
											</div>
										</React.Fragment>
									}
								</React.Fragment>
					}
				</React.Fragment>
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