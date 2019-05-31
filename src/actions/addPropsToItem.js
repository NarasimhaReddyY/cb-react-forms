import uuid from 'uuid/v4';

export default (item) => {
  switch (item) {
    case 'Header':
    case 'Paragraph':
    case 'Label':
      return {
        label: 'Placeholder header'
      };

    case 'Checkboxes':
    case 'Dropdown': 
      return {
        label: 'Placeholder label',
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
        label: 'Placeholder label',
        required: false,
        url: 'www.example.com'
      };

    case 'LineBreak':
      return {};
    
    case 'NumberInput':
      return {
        required: false,
        label: 'Placeholder label',
        value: 0
      };
      
    case 'RadioButtons':
    case 'Tags':
      return {
        required: false,
        label: 'Placeholder label',
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
        label: 'Placeholder label',
        value: 0,
        min: 0,
        max: 5
      };

    case 'Rating':
      return {
        required: false,
        label: 'Placeholder label',
        value: 0,
        numberOfStars: 5
      };

    case 'TextInput':
    case 'TextArea':
      return {
        required: false,
        label: 'Placeholder label',
        value: ''
      };
  }
}