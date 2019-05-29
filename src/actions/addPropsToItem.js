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
        text: 'Placeholder header',
        alignCenter: true,
      };
    case 'HyperLink':
      return {
        label: 'Placeholder label',
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
        label: 'Placeholder label'
      };
    case 'Paragraph':
      return {
        text: 'Placeholder paragraph',
        alignCenter: false,
      };
    case 'RadioButtons':
      return {
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
        label: 'Placeholder label'
      };
    case 'Rating':
      return {
        label: 'Placeholder label'
      };
    case 'Tags':
      return {
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
        label: 'Placeholder label'
      };
    case 'TextArea':
      return {
        label: 'Placeholder label'
      };
  }
}