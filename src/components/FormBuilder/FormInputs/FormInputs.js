import React, { Component } from 'react';
import Slider from "react-rangeslider";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import StarRatings from 'react-star-ratings';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

// convert draftjs state to html
const convertToHtml = label => {
  return ( 
  draftToHtml(convertToRaw(label.getCurrentContent()))
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '')
  ) 
}

class RequiredLabel extends Component {
  render() {
    const { label, required } = this.props;
    const text = convertToHtml(label)

    return (
      <div>
        { 
          required ? (
            <span className="ml-1 badge badge-danger float-right">Required</span>
          ) : null
        }
        <p dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    )
  }
}

class Checkboxes extends Component {
  render() {
    const { label, options, required } = this.props.item;

    return (
      <div>
        <RequiredLabel 
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
    const { label, required, options } = this.props.item;

    return (
      <div className="form-group">
        <RequiredLabel 
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
    const { label } = this.props.item;
    const text = convertToHtml(label);

    return (
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
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
    const { label, required, url } = this.props.item;

    return (
      <div>
        <RequiredLabel 
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
    const { label } = this.props.item;
    const text = convertToHtml(label);

    return (
      <div dangerouslySetInnerHTML={{ __html: text }}>
      </div>
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
    const { label, required } = this.props.item;

    return (
      <div>
        <RequiredLabel 
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
    const { label } = this.props.item;
    const text = convertToHtml(label);

    return (
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
    )
  }
}

class RadioButtons extends Component {
  render() {
    const { label, options, required } = this.props.item;

    return (
      <div>
        <RequiredLabel 
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
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || 1
    }
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
    const { label, required, min, max } = this.props.item;

    return (
      <div>
        <RequiredLabel 
          label={label}
          required={required}
        />
        <Slider 
          min={min}
          max={max}
          step={1}
          value={this.state.value}
          tooltip={true}
          labels={{
            [min]: 'Low',
            [max]: 'High'
          }}
          onChange={this.handleChange}
        />
        <div className="text-center">{this.state.value}</div>
      </div>
    )
  }
}

class Rating extends Component {
  render() {
    const { label, required, numberOfStars, value } = this.props.item;
    
    return (
      <div>
        <RequiredLabel 
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
    const { label, required, options } = this.props.item;
    const animatedComponents = makeAnimated();
    
    return (
      <div>
        <RequiredLabel 
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
    const { label, required } = this.props.item;

    return (
      <div>
        <RequiredLabel 
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
    const { label, required } = this.props.item;

    return (
      <div>
        <RequiredLabel 
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