export default (item) => {
  switch(item) {
    case 'Checkboxes': 
      return {}
    case 'Dropdown':
      return {
        options: ['hello', 'hi']
      }
    case 'Header':
      return {
        alignCenter: true
      }
    case 'Hyperlink':
      return {}
    case 'Label':
      return {}
    case 'LineBreak':
      return {}
    case 'NumberInput':
      return {}
    case 'Paragraph':
      return {
        alignCenter: true,
      }
    case 'RadioButtons':
      return {}
    case 'Range':
      return {
        required: true
      }
    case 'Rating':
      return {}
    case 'Tags':
      return {
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
    case 'TextArea':
      return {}
  }
}