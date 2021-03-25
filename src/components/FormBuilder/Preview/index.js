import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { compose } from 'redux'
import isEmpty from 'lodash/isEmpty'
import {
  removeItem,
  dragItem,
  showEditor,
} from '../../../actions/formBuilderActions'
import FormInputs from './SortableFormInputs'
import FinalFormPreview from './FinalFormPreview'

// DropTarget parameters
const type = () => 'items'

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
  item: monitor.getItem(),
})

class Preview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFinalPreview: false,
    }
  }

  hideFinalPreview = () => {
    this.setState({ showFinalPreview: false })
  }

  render() {
    const {
      hovered,
      dragItem,
      onSubmit,
      removeItem,
      showEditor,
      previewItems,
      connectDropTarget,
    } = this.props

    const border = hovered ? '1px solid green' : '1px solid #ccc'

    return connectDropTarget(
      <div style={{ height: '100%' }} className="mt-3">
        {this.state.showFinalPreview && (
          <FinalFormPreview
            data={previewItems}
            hideFinalPreview={this.hideFinalPreview}
          />
        )}
        <div style={{ height: '100%' }}>
          <div style={{ height: '50px' }}>
            <h3 className="float-left">Form Builder</h3>
            <button
              className="btn btn-primary float-right ml-3"
              onClick={() => this.setState({ showFinalPreview: true })}
              disabled={isEmpty(previewItems)}
            >
              Preview
            </button>
            <button
              className="btn btn-dark float-right ml-3"
              onClick={() => onSubmit(JSON.stringify(previewItems))}
              disabled={isEmpty(previewItems)}
            >
              Export
            </button>
          </div>
          <div
            className="jumbotron bg-default"
            style={{ border, minHeight: '80vh' }}
          >
            {isEmpty(previewItems) && (
              <h3 className="list-group-item bg-light text-center text-muted">
                Select / Drop an item from Toolbox
              </h3>
            )}

            {!isEmpty(previewItems) &&
              previewItems.map((item, i) => (
                <FormInputs
                  index={i}
                  item={item}
                  id={item.id}
                  key={item.id}
                  dragItem={dragItem}
                  removeItem={removeItem}
                  showEditor={showEditor}
                />
              ))}
          </div>
        </div>
      </div>,
    )
  }
}

export default compose(
  connect(
    (state, ownProps) => ({
      previewItems: state.formBuilder.previewItems.length > 0 ? state.formBuilder.previewItems : ownProps.previewItems,
    }),
    {
      removeItem,
      dragItem,
      showEditor,
    },
  ),
  DropTarget(type, {}, collect),
)(Preview)
