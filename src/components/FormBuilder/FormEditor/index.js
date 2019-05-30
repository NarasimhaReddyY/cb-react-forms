import React, { Component } from "react";
import { connect } from "react-redux";
import { hideEditor, submitEditorState } from "../../../actions/previewItemsActions";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class FormEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: this.props.editorState
		};
	}

	toggleField = field => {
		this.setState(prev => (prev.editorState[field] = !this.state.editorState[field]));
	};

	handleInputChange = e => {
		e.persist();
		this.setState(prev => (prev.editorState[e.target.name] = e.target.value));
	};

	handleSubmit = state => {
		this.props.submitEditorState(state);
		this.props.hideEditor();
	};

	handleClose = () => {
		this.setState({ editorState: this.props.editorState });
		this.props.hideEditor();
	};

	render() {
		const { hideEditor, submitEditorState } = this.props;
		const { editorState } = this.state;
		console.log(this.state.editorState);

		return (
			<div className="form_editor">
				<div className="jumbotron bg-default mx-auto" style={{ border: "1px solid #aaa", width: "80%" }}>
					<span className="float-right" onClick={() => hideEditor()} style={{ cursor: "pointer" }}>
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
              (<div className="form-check">
                <input
                  type="checkbox"
                  id="required"
                  checked={editorState.required}
                  onChange={() => this.toggleField("required")}
                />
                <label htmlFor="required" className="form-label ml-2">
                  Required
                </label>
              </div>)
            }
					</div>

					<button className="btn btn-muted mt-5" onClick={() => this.handleClose()}>
						Cancel
					</button>
					<button className="btn btn-secondary mt-5" onClick={() => this.handleSubmit(this.state.editorState)}>
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
