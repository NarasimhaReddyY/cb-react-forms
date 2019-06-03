import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from 'uuid/v4';
import { hideEditor, submitEditorState } from "../../../actions/previewItemsActions";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const toolbar = {
	options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
	inline: {
		inDropdown: false,
		options: ['bold', 'italic', 'underline', 'superscript', 'subscript']
	}
}

class FormEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: {
				...this.props.editorState
			},
		};
	}

	handleEditorChange = (editorState) => {
		this.setState(prev => ({
			...prev,
			editorState: {
				...this.state.editorState,
				label: editorState
			}
		}))
	}

	toggleField = field => {
		this.setState(prev => (prev.editorState[field] = !this.state.editorState[field]));
	};

	handleInputChange = e => {
		e.persist();
		this.setState(prev => (prev.editorState[e.target.name] = e.target.value));
	};

	addOption = () => {
		let option = {
			id: uuid(),
			value: ''
		};
		this.setState((prev) => ({
			...prev,
			editorState: {
				...this.state.editorState,
				options: [...this.state.editorState.options, option]
			}
		}));
	}

	removeOption = id => {
		let { options } = this.state.editorState;
		let updatedOptions = [...options];
		if(options.length > 1) {
			updatedOptions = options.filter(option => option.id !== id);
		}
		this.setState(prev => ({
			...prev,
			editorState: {
				...this.state.editorState,
				options: [...updatedOptions]
			}
		}));
	}

	handleLabel = (e, id) => {
		let updatedOptions = this.state.editorState.options.map(option => {
			if (option.id === id) {
				option.value = e.target.value
				return option;
			}
			return option;
		})
		this.setState((prev) => ({
			...prev,
			editorState: {
				...this.state.editorState,
				options: [...updatedOptions]	
			}
		}))
	}

	addTagsOption = () => {
		let option = {
			id: uuid(),
			value: '',
			label: ''
		};
		let updatedOptions = this.state.editorState.options;
		updatedOptions.push(option);
		this.setState((prev) => ({
			...prev,
			editorState: {
				...this.state.editorState,
				options: [...updatedOptions]
			}
		}));
	}

	handleTagsLabel = (e, id) => {
		let updatedOptions = this.state.editorState.options.map(option => {
			if (option.id === id) {
				option.label = e.target.value
				return option;
			}
			return option;
		})
		this.setState((prev) => ({
			...prev,
			editorState: {
				...this.state.editorState,
				options: [...updatedOptions]	
			}
		}))
	}

	handleTagsValue = (e, id) => {
		let updatedOptions = this.state.editorState.options.map(option => {
			if (option.id === id) {
				option.value = e.target.value
				return option;
			}
			return option;
		})
		this.setState((prev) => ({
			...prev,
			editorState: {
				...this.state.editorState,
				options: [...updatedOptions]	
			}
		}))
	}

	handleRatingChange = (e) => {
		this.setState({
			editorState: {
				...this.state.editorState,
				numberOfStars: parseFloat(e.target.value)
			}
		})
	}

	handleHyperlink = (e) => {
		this.setState({
			editorState: {
				...this.state.editorState,
				url: e.target.value
			}
		})
	}

	handleRangeOptions = (e) => {
		e.persist();
		this.setState(prev => (prev.editorState[e.target.name] = parseFloat(e.target.value)));
	}

	render() {
		const { hideEditor, submitEditorState } = this.props;
		const { editorState } = this.state;

		return (
			<div className="form_editor">
				<div 
					className="jumbotron bg-default mx-auto" 
					style={{ border: "1px solid #aaa", width: "80%" }}
				>
					<span 
						className="float-right" 
						style={{ cursor: "pointer" }} 
						onClick={() => hideEditor()}
					>
						<i className="fa fa-times" />
					</span>
					<h2 className="mb-4">{editorState.element} Editor</h2>

          {/* ------------- LABEL ------------- */}
					<h5>Label:</h5>
					<Editor
						toolbar={toolbar}
						wrapperClassName="demo-wrapper"
						editorClassName="demo-editor"
						editorState={this.state.editorState.label}
						onEditorStateChange={this.handleEditorChange}
					/>

					<div className="mt-5">
						{
							this.state.editorState.options && <h5>Options:</h5>
						}

            {/* ------------- REQUIRED ------------- */}
            {
              this.state.editorState.hasOwnProperty('required') &&
              <div className="form-check">
                <input
                  type="checkbox"
                  id="required"
                  checked={editorState.required}
                  onChange={() => this.toggleField("required")}
                />
                <label htmlFor="required" className="form-label ml-2">
                  Required
                </label>
              </div>
            }
					</div>

					{/* ------------- DROPDOWN OPTIONS ------------- */}
					{
						this.state.editorState.element === "Dropdown" && 
						<div className="mt-5">
							<h5>Options:</h5>
							{
								editorState.options.map(({ id, value, option }) => (
									<div key={id} className="input-group mb-2">
										<input 
											className="form-control" 
											placeholder="Option" 
											value={value} 
											onChange={(e) => this.handleLabel(e, id)} 
										/>
										<div className="input-group-append">
											<button 
												className="btn btn-danger" 
												onClick={() => {this.removeOption(id)}}
											>
												<i className="fa fa-times"></i>
											</button>
										</div>
									</div>
								))
							}
							<button className="btn btn-primary" onClick={this.addOption}>Add Option</button>
						</div>
					}

					{/* ------------- TAGS OPTIONS ------------- */}
					{
						this.state.editorState.element === "Tags" && 
						<div className="mt-5">
							<h5>Options:</h5>
							{
								editorState.options.map(({ id, value, label }) => (
									<div key={id} className="input-group mb-2">
										<div className="input-group-prepend">
											<span className="input-group-text">Label and Value</span>
										</div>
										<input 
											className="form-control" 
											value={label} 
											placeholder="Label" 
											onChange={(e) => this.handleTagsLabel(e, id)} 
										/>
										<input 
											className="form-control" 
											value={value} 
											placeholder="Value" 
											onChange={(e) => this.handleTagsValue(e, id)} 
										/>
										<div className="input-group-append">
											<button 
												className="btn btn-danger" 
												onClick={() => {this.removeOption(id)}}
											>
													<i className="fa fa-times"></i>
											</button>
										</div>
									</div>
								))
							}
							<button className="btn btn-primary" onClick={this.addTagsOption}>Add Option</button>
						</div>
					}

					{/* ------------- CHECKBOXES OPTIONS ------------- */}
					{
						this.state.editorState.element === "Checkboxes" && 
						<div className="mt-5">
							<h5>Options:</h5>
							{
								editorState.options.map(({ id, value }) => (
									<div key={id} className="input-group mb-2">
										<input 
											className="form-control" 
											placeholder="Option" 
											value={value}
											name={editorState.id} 
											onChange={(e) => this.handleLabel(e, id)} 
										/>
										<div className="input-group-append">
											<button 
												className="btn btn-danger" 
												onClick={() => {this.removeOption(id)}}
											>
												<i className="fa fa-times"></i>
											</button>
										</div>
									</div>
								))
							}
							<button className="btn btn-primary" onClick={this.addOption}>Add Option</button>
						</div>
					}

					{/* ------------- RADIO BUTTON OPTIONS ------------- */}
					{
						this.state.editorState.element === "RadioButtons" && 
						<div className="mt-5">
							<h5>Options:</h5>
							{
								editorState.options.map(({ id, value, label }) => (
									<div key={id} className="input-group mb-2">
										<div className="input-group-prepend">
											<span className="input-group-text">Label and Value</span>
										</div>
										<input 
											className="form-control" 
											value={label} 
											placeholder="Label" 
											onChange={(e) => this.handleTagsLabel(e, id)} 
										/>
										<input 
											className="form-control" 
											value={value} 
											placeholder="Value" 
											onChange={(e) => this.handleTagsValue(e, id)} 
										/>
										<div className="input-group-append">
											<button 
												className="btn btn-danger" 
												onClick={() => {this.removeOption(id)}}
											>
												<i className="fa fa-times"></i>
											</button>
										</div>
									</div>
								))
							}
							<button className="btn btn-primary" onClick={this.addTagsOption}>Add Option</button>
						</div>
					}

					{/* ------------- RATING OPTIONS ------------- */}
					{
						this.state.editorState.element === "Rating" &&
						<div className="mt-5">
							<h5>Number of Stars:</h5>
							<input className="form-control" type="number" value={editorState.numberOfStars} onChange={this.handleRatingChange} min={0} />	
						</div>
					}

					{/* ------------- HYPERLINK OPTIONS ------------- */}
					{
						this.state.editorState.element === "HyperLink" &&
						<div className="mt-5">
							<h5>Link:</h5>
							<input className="form-control" type="text" value={editorState.url} onChange={this.handleHyperlink} min={0} />	
						</div>
					}

					{/* ------------- RANGE OPTIONS ------------- */}
					{
						this.state.editorState.element === "Range" &&
						<div className="mt-5">
							<h5>Range Options:</h5>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">Min</span>
								</div>
							<input className="form-control" type="number" name="min" value={editorState.min} onChange={this.handleRangeOptions} min={0} />	
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">Max</span>
								</div>
							<input className="form-control" type="number" name="max" value={editorState.max} onChange={this.handleRangeOptions} min={0} />	
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">Value</span>
								</div>
							<input className="form-control" type="number" name="value" value={editorState.value} onChange={this.handleRangeOptions} min={0} />	
							</div>
						</div>
					}

					<button className="btn btn-muted mt-5" onClick={hideEditor}>
						Cancel
					</button>
					<button className="btn btn-secondary mt-5" onClick={() => submitEditorState(editorState)}>
						Done
					</button>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		editorState: state.preview.editorState
	}),
	{
		hideEditor,
		submitEditorState
	}
)(FormEditor);