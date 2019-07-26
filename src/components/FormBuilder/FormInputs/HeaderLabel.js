import React, { Component } from 'react';
import convertToHtml from './convertDraftjsToHtml'

class HeaderLabel extends Component {

  render() {
    const { label, required, readOnly } = this.props;
    
    const text = convertToHtml(label);

    return (
      <div>
        {required ? (
          !readOnly &&
          <span className="ml-1 badge badge-danger float-right">
            Required
          </span>
          ) : null}
        <h6 dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    );
  }
}

HeaderLabel.defaultProps = {
  readOnly: false
}

export default HeaderLabel;