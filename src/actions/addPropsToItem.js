import uuid from 'uuid/v4';
import htmlToDraft from 'html-to-draftjs';
import { ContentState, EditorState} from 'draft-js';

// convert html to draftjs state
const convertHtmlToDraft = html => {
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState = EditorState.createWithContent(contentState);
  return editorState;  
}

const html = "<div>Placeholder Label...</div>";

export default (item) => {
  switch (item) {
    case 'Header':
    case 'Paragraph':
    case 'Label':
      return {
        label: convertHtmlToDraft(html)
      };

    case 'Checkboxes':
    case 'Dropdown': 
      return {
        label: convertHtmlToDraft(html),
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
        ]
      };

    case 'HyperLink':
      return {
        label: convertHtmlToDraft(html),
        required: false,
        url: 'www.example.com'
      };

    case 'LineBreak':
      return {};
    
    case 'NumberInput':
      return {
        required: false,
        label: convertHtmlToDraft(html),
        value: 0
      };
      
    case 'RadioButtons':
    case 'Tags':
      return {
        required: false,
        label: convertHtmlToDraft(html),
        options: [
          {
            id: uuid(),
            label: 'Option 1',
            value: 'Option 1'
          },
          {
            id: uuid,
            label: 'Option 2',
            value: 'Option 2'
          }
        ]
      };

    case 'Range':
      return {
        required: false,
        label: convertHtmlToDraft(html),
        value: 0,
        min: 0,
        max: 5
      };

    case 'Rating':
      return {
        required: false,
        label: convertHtmlToDraft(html),
        value: 0,
        numberOfStars: 5
      };

    case 'TextInput':
    case 'TextArea':
      return {
        required: false,
        label: convertHtmlToDraft(html),
        value: ''
      };
  }
}