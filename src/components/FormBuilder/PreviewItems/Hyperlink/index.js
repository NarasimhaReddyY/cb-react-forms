import React, { Component } from 'react';
import classNames from 'classnames';

class Hyperlink extends Component {
  render() {
    const { label, required, bold, italic, url } = this.props.item;
    const hyperlinkClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    });

    return (
      <div>
        <p>
          <span className={hyperlinkClass}>{label}</span>
          { 
            required ? (
              <span className="ml-1 badge badge-danger">Required</span>
            ) : null
          }
        </p>
        <a target="_blank" href={url}>{url}</a>
      </div>
    )
  }
}

export default Hyperlink;