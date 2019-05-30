import uuid from 'uuid/v4';

export default (item) => {
  switch (item) {
    case 'Checkboxes': 
      return {
        label: 'Placeholder label',
        options: [
          {
            id: uuid(),
            label: 'Option1',
            value: 'Option1'
          },
          {
            id: uuid(),
            label: 'Option2',
            value: 'Option2'
          }
        ]
      };
    case 'Dropdown':
      return {
        label: 'Placeholder label',
        required: false,
        options: [
          {
            id: uuid(),
            value: 'Option 1'
          },
          {
            id: uuid(),
            value: 'Option 2'
          }
        ]
      };
    case 'Header':
      return {
        label: 'Placeholder header',
        alignCenter: true,
      };
    case 'HyperLink':
      return {
        label: 'Placeholder label',
        required: false,
        url: 'www.example.com'
      };
    case 'Label':
      return {
        label: 'Placeholder label'
      };
    case 'LineBreak':
      return {};
    case 'NumberInput':
      return {
        required: false,
        label: 'Placeholder label'
      };
    case 'Paragraph':
      return {
        label: 'Placeholder paragraph',
        alignCenter: false,
      };
    case 'RadioButtons':
      return {
        required: false,
        label: 'Placeholder label',
        options: [
          {
            id: uuid(),
            label: 'RadioButton 1',
            value: 'RadioButton 1'
          },
          {
            id: uuid,
            label: 'RadioButton 2',
            value: 'RadioButton 2'
          }
        ]
      };
    case 'Range':
      return {
        required: false,
        label: 'Placeholder label'
      };
    case 'Rating':
      return {
        required: false,
        label: 'Placeholder label'
      };
    case 'Tags':
      return {
        required: false,
        label: 'Placeholder label',
        options: [
          {
            id: uuid(),
            label: 'Tag1',
            value: 'tag1'
          },
          {
            id: uuid(),
            label: 'Tag2',
            value: 'tag2'
          }
        ]
      };
    case 'TextInput':
      return {
        required: false,
        label: 'Placeholder label'
      };
    case 'TextArea':
      return {
        required: false,
        label: 'Placeholder label'
      };
  }
}