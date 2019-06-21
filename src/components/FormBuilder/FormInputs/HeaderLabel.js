import React, { Component } from 'react';
import convertToHtml from './convertDraftjsToHtml'

class HeaderLabel extends Component {
	render() {
		const { label, required } = this.props;
		const text = convertToHtml(label);

		return (
  <div>
    {required ? (
      <span className="ml-1 badge badge-danger float-right">
						Required
					
      </span>
				) : null}
    <p dangerouslySetInnerHTML={{ __html: text }} />
  </div>
		);
	}
}

export default HeaderLabel;