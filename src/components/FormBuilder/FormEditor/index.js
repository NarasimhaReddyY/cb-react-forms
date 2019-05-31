import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from 'uuid/v4';
import Select from 'react-select';
import { hideEditor, submitEditorState } from "../../../actions/previewItemsActions";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class FormEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: {...this.props.editorState}
		};
	}

	toggleField = field => {
		this.setState(prev => (prev.editorState[field] = !this.state.editorState[field]));
	};

	handleInputChange = e => {
		e.persist();
		this.setState(prev => (prev.editorState[e.target.name] = e.target.value));
	};

	handleDropdownLable = (e, element) => {
		let updatedOptions = this.state.editorState.options.map(option => {
			if (option.id === element.id) {
				option.value = e.target.value
				return option;
			}
			return option;
		})
		this.setState((prev) => ({
			...prev,
			options: [...updatedOptions]	
		}))
	}

	addDropdownOption = () => {
		let option = {
			id: uuid(),
			value: ''
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

	handleTagsLabel = (e, element) => {
		let updatedOptions = this.state.editorState.options.map(option => {
			if (option.id === element.id) {
				option.label = e.target.value
				return option;
			}
			return option;
		})
		this.setState((prev) => ({
			...prev,
			options: [...updatedOptions]	
		}))
	}

	handleTagsValue = (e, element) => {
		let updatedOptions = this.state.editorState.options.map(option => {
			if (option.id === element.id) {
				option.value = e.target.value
				return option;
			}
			return option;
		})
		this.setState((prev) => ({
			...prev,
			options: [...updatedOptions]	
		}))
	}

	render() {
		const { hideEditor, submitEditorState } = this.props;
		const { editorState } = this.state;

		return (
			<div className="form_editor">
				<div className="jumbotron bg-default mx-auto" style={{ border: "1px solid #aaa", width: "80%" }}>
					<span className="float-right" style={{ cursor: "pointer" }} onClick={() => hideEditor()}>
						<i className="fa fa-times" />
					</span>
					<h2 className="mb-4">{editorState.element} Editor</h2>

          {/* ------------- LABEL ------------- */}
					<h5>Text:</h5>
					<input
						type="text"
						name="label"
						className="form-control"
						value={editorState.label}
						onChange={e => {
							this.handleInputChange(e);
						}}
					/>

					<div className="mt-5">
						<h5>Edit Options:</h5>

            {/* ------------- BOLD ------------- */}
						<div className="form-check">
              <input 
                type="checkbox" 
                id="bold" 
                checked={editorState.bold} 
                onChange={() => this.toggleField("bold")} 
              />
							<label htmlFor="bold" className="form-label ml-2">
								Bold
							</label>
						</div>

            {/* ------------- ITALIC ------------- */}
						<div className="form-check">
              <input 
                type="checkbox" 
                id="italic" 
                checked={editorState.italic} 
                onChange={() => this.toggleField("italic")} 
              />
							<label htmlFor="italic" className="form-label ml-2">
								Italic
							</label>
						</div>

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
								editorState.options.map(option => (
									<div key={option.id} className="input-group mb-2">
										<input className="form-control" placeholder="Option" value={option.value} onChange={(e) => this.handleDropdownLable(e, option)} />
										<div className="input-group-append">
											<button className="btn btn-danger" onClick={() => {this.removeOption(option.id)}}>
												<i className="fa fa-times"></i>
											</button>
										</div>
									</div>
								))
							}
							<button className="btn btn-primary" onClick={this.addDropdownOption}>Add Option</button>
						</div>
					}

					{/* ------------- TAGS OPTIONS ------------- */}
					{
						this.state.editorState.element === "Tags" && 
						<div className="mt-5">
							<h5>Options:</h5>
							{
								editorState.options.map(option => (
									<div key={option.id} className="input-group mb-2">
										<div className="input-group-prepend">
											<span className="input-group-text">Label and Value</span>
										</div>
										<input className="form-control" value={option.label} placeholder="Label" onChange={(e) => this.handleTagsLabel(e, option)} />
										<input className="form-control" value={option.value} placeholder="Value" onChange={(e) => this.handleTagsValue(e, option)} />
										<div className="input-group-append">
											<button className="btn btn-danger" onClick={() => {this.removeOption(option.id)}}>
												<i className="fa fa-times"></i>
											</button>
										</div>
									</div>
								))
							}
							<button className="btn btn-primary" onClick={this.addTagsOption}>Add Option</button>
						</div>
					}

					<button className="btn btn-muted mt-5" onClick={hideEditor}>
						Cancel
					</button>
					<button className="btn btn-secondary mt-5" onClick={() => submitEditorState(this.state.editorState)}>
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