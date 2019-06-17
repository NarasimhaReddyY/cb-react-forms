import uuid from 'uuid/v4';
import htmlToDraft from 'html-to-draftjs';
import { ContentState, EditorState, convertToRaw } from 'draft-js';

// convert html to draftjs-editorState and then return raw JS
// editorState is stored as raw JS object in the Redux store
const convertHtmlToRawJs = html => {
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState = EditorState.createWithContent(contentState);
  return convertToRaw(editorState.getCurrentContent());  
}

const html = "<div>Placeholder Label</div>";

export default (item) => {
  switch (item) {
    case 'Header':
    case 'Paragraph':
    case 'Label':
      return {
        label: convertHtmlToRawJs(html)
      };

    case 'Checkboxes':
      return {
        label: convertHtmlToRawJs(html),
        required: false,
        options: [
          {
            id: uuid(),
            value: 'Option1',
            checked: false
          },
          {
            id: uuid(),
            value: 'Option2',
            checked: false
          }
        ]
      };

    case 'Dropdown':
      return {
        label: convertHtmlToRawJs(html),
        required: false,
        options: [
          {
            id: uuid(),
            value: 'Option1'
          },
          {
            id: uuid(),
            value: 'Option2'
          }
        ],
        value: null
      };

    case 'HyperLink':
      return {
        label: convertHtmlToRawJs(html),
        required: false,
        value: ''
      };

    case 'LineBreak':
      return {};
    
    case 'NumberInput':
      return {
        required: false,
        label: convertHtmlToRawJs(html),
        value: 0
      };
      
    case 'RadioButtons':
      return {
        required: false,
        label: convertHtmlToRawJs(html),
        options: [
          {
            id: uuid(),
            label: 'Label1',
            value: 'Value1',
            checked: false
          },
          {
            id: uuid(),
            label: 'Label2',
            value: 'Value2',
            checked: false
          }
        ]
      };
    case 'Tags':
      return {
        required: false,
        label: convertHtmlToRawJs(html),
        options: [
          {
            id: uuid(),
            label: 'Label1',
            value: 'Value1',
          },
          {
            id: uuid(),
            label: 'Label2',
            value: 'Value2'
          }
        ],
        value: []
      };

    case 'Range':
      return {
        required: false,
        label: convertHtmlToRawJs(html),
        value: 3,
        min: 1,
        max: 5
      };

    case 'Rating':
      return {
        required: false,
        label: convertHtmlToRawJs(html),
        value: 0,
        numberOfStars: 5
      };

    case 'TextInput':
    case 'TextArea':
      return {
        required: false,
        label: convertHtmlToRawJs(html),
        value: ''
      };
  }
}