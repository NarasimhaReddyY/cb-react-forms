import React, { Component } from 'react';
import classNames from 'classnames';
import Slider from "react-rangeslider";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import StarRatings from 'react-star-ratings';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

class Required extends Component {
  render() {
    const { bold, italic, label, required } = this.props;
    const requiredClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    });

    return (
      <p>
        <span className={requiredClass}>{label}</span>
        { 
          required ? (
            <span className="ml-1 badge badge-danger">Required</span>
          ) : null
        }
      </p>
    )
  }
}

class Checkboxes extends Component {
  render() {
    const { label, options, required, bold, italic } = this.props.item;

    return (
      <div>
        <Required 
          bold={bold}
          italic={italic}
          label={label}
          required={required}
        />
        <div className="form-group">
          {
            options.map(({ value }) => (
              <div key={value} className="d-block">
                <input id={value} type="checkbox" name={value} />
                <label className="form-lable ml-2" htmlFor={value}>
                  {value}
                </label>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

class Dropdown extends Component {
  render() {
    const { label, required, bold, italic, options } = this.props.item;

    return (
      <div className="form-group">
        <Required 
          bold={bold}
          italic={italic}
          label={label}
          required={required}
        />
        <select className="form-control">
          {
            options.map(({ id, value }) => (
              <option key={id}>{value}</option>
            ))
          }
        </select>
      </div>
    )
  }
}

class Header extends Component {
  render() {
    const { bold, italic, label } = this.props.item;
    const headerClasss = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    });
    console.log('label', label)

    return (
      <div>
        {draftToHtml(convertToRaw(label.getCurrentContent()))
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '')
        }
      </div>
    )
  }
}

class HeaderBar extends Component {
  render() {
    const { 
      item, 
      removeItem, 
      id,
      showEditor,
      isHovering 
    } = this.props;
    const opacity = isHovering ? 1 : 0;

    return (
      <div style={{ opacity }}>
        <span className="badge badge-secondary">
          {item.element}
        </span>
        <span 
          onClick={() => removeItem(id)} 
          className="float-right onHover"
        >
          <i className="fa fa-trash-o" />
        </span>
        {
          item.element !== 'LineBreak' && 
          <span 
            onClick={() => showEditor(item)} 
            className="float-right onHover"
          >
            <i className="fa fa-edit mr-3"/>
          </span>
        }
      </div>
    )
  }
}

class Hyperlink extends Component {
  render() {
    const { label, required, bold, italic, url } = this.props.item;

    return (
      <div>
        <Required 
          bold={bold}
          italic={italic}
          label={label}
          required={required}
        />
        <a target="_blank" href={url}>{url}</a>
      </div>
    )
  }
}

class Label extends Component {
  render() {
    const { bold, italic, label } = this.props.item;
    const labelClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
      });

    return (
      <label>
        {draftToHtml(convertToRaw(label.getCurrentContent()))
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '')
        }
      </label>
    )
  }
}

class LineBreak extends Component {
  render() {
    return (
      <hr />
    )
  }
}

class NumberInput extends Component {
  render() {
    const { label, required, bold, italic } = this.props.item;

    return (
      <div>
        <Required 
          bold={bold}
          italic={italic}
          label={label}
          required={required}
        />
        <div className="form-group">
          <input className="form-control" type="number" />
        </div>
      </div>
    )
  }
}

class Paragraph extends Component {
  render() {
    const { bold, italic, label } = this.props.item;
    const paragraphClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    })

    return (
      <p>
        {draftToHtml(convertToRaw(label.getCurrentContent()))
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '')
        }
      </p>
    )
  }
}

class RadioButtons extends Component {
  render() {
    const { label, options, required, bold, italic } = this.props.item;

    return (
      <div>
        <Required 
          bold={bold}
          italic={italic}
          label={label}
          required={required}
        />
        <div className="form-group">
          {
            options.map(({ id, label, value }) => (
              <div key={id} className="d-block">
                <input id={value} type="radio" name="radio" />
                <label className="form-lable ml-2" htmlFor={value}>
                  {label}
                </label>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

class Range extends Component {
  render() {
    const { label, required, bold, italic, min, max, value } = this.props.item;

    return (
      <div>
        <Required 
          bold={bold}
          italic={italic}
          label={label}
          required={required}
        />
        <Slider 
          min={min}
          max={max}
          value={value}
        />
        <div className="text-center">{value}</div>
      </div>
    )
  }
}

class Rating extends Component {
  render() {
    const { label, required, bold, italic, numberOfStars, value } = this.props.item;
    
    return (
      <div>
        <Required 
          bold={bold}
          italic={italic}
          label={label}
          required={required}
        />
        <StarRatings
          numberOfStars={numberOfStars}
          name="rating"
          starRatedColor="orange"
          rating={value}
        />
      </div>
    )
  }
}

class Tags extends Component {
  render() {
    const { label, required, bold, italic, options } = this.props.item;
    const animatedComponents = makeAnimated();
    
    return (
      <div>
        <Required 
          bold={bold}
          italic={italic}
          label={label}
          required={required}
        />
        <Select 
          options={options}
          components={animatedComponents}
          isMulti 
        />
      </div>
    )
  }
}

class TextArea extends Component {
  render() {
    const { label, required, bold, italic } = this.props.item;

    return (
      <div>
        <Required 
          bold={bold}
          italic={italic}
          label={label}
          required={required}
        />
        <div className="form-group">
          <textarea className="form-control" type="text" />
        </div>
      </div>
    )
  }
}

class TextInput extends Component {
  render() {
    const { label, required, bold, italic } = this.props.item;

    return (
      <div>
        <Required 
          bold={bold}
          italic={italic}
          label={label}
          required={required}
        />
        <div className="form-group">
          <input className="form-control" type="text" />
        </div>
      </div>
    )
  }
}

export { 
  Checkboxes, 
  Dropdown, 
  Header, 
  HeaderBar, 
  Hyperlink, 
  Label, 
  LineBreak, 
  NumberInput, 
  Paragraph, 
  RadioButtons, 
  Range, 
  Rating, 
  Tags, 
  TextArea, 
  TextInput 
}