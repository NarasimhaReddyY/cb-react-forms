export default (item) => {
  switch(item) {
    case 'Checkboxes': 
      return {
        label: 'Placeholder label',
        options: [
          {
            label: 'Option1',
            value: 'Option1'
          },
          {
            label: 'Option2',
            value: 'Option2'
          }
        ]
      }
    case 'Dropdown':
      return {
        label: 'Placeholder label',
        options: ['hello', 'hi']
      }
    case 'Header':
      return {
        text: 'Placeholder header',
        alignCenter: true
      }
    case 'HyperLink':
      return {
        label: 'Placeholder label',
        url: 'www.example.com'
      }
    case 'Label':
      return {
        label: 'Placeholder label'
      }
    case 'LineBreak':
      return {}
    case 'NumberInput':
      return {
        label: 'Placeholder label'
      }
    case 'Paragraph':
      return {
        text: 'Placeholder Text',
        alignCenter: false,
      }
    case 'RadioButtons':
      return {
        label: 'Placeholder label',
        options: [
          {
            label: 'Option1',
            value: 'Option1'
          },
          {
            label: 'Option2',
            value: 'Option2'
          }
        ]
      }
    case 'Range':
      return {
        label: 'Placeholder label',
        required: true
      }
    case 'Rating':
      return {
        label: 'Placeholder label',
      }
    case 'Tags':
      return {
        label: 'Placeholder label',
        options: [
          {
            label: 'Tag1',
            value: 'tag1'
          },
          {
            label: 'Tag2',
            value: 'tag2'
          }
        ]
      }
    case 'TextInput':
      return {
        label: 'Placeholder label'
      }
    case 'TextArea':
      return {
        label: 'Placeholder label'
      }
  }
}