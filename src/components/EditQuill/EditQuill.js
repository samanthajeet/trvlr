import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css'
// import sticky_toolbar from '../src/module-sticky-toolbar'

const Editor = {}
Editor.modules = {}
Editor.modules.toolbar = [
  ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
  ['blockquote', 'code-block'],                    // blocks
  [{ 'header': 1 }, { 'header': 2 }],              // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
  [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
  [{ 'direction': 'rtl' }],                        // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
  [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
  [{ 'font': [] }],                                // font family
  [{ 'align': [] }],                               // text align
  ['clean'],                                       // remove formatting
]

Editor.formats = [
  'header', 'font', 'background', 'color', 'code', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'script', 'align', 'direction',
  'link', 'image', 'code-block', 'formula', 'video'
]

class EditQuill extends React.Component {
  constructor (props) {
    super(props)

    this.state = { 
      editorHtml: '', 
      test_text: this.props.existing_text,
      mountedEditor: false 
    }

    this.quillRef = null;
    this.reactQuillRef = null;
    this.handleChange = this.handleChange.bind(this)
    this.attachQuillRefs = this.attachQuillRefs.bind(this);
    this.consoleText = this.consoleText.bind(this);
  }
  
  componentDidMount () {
    this.attachQuillRefs();
  }
  
  componentDidUpdate () {
    this.attachQuillRefs()
  }
  
  attachQuillRefs() {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    if (this.quillRef != null) return;
    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  }
  
  
  consoleText(){
    console.log(this.state.editorHtml)
  }
  
  handleChange (html) {
    this.setState({ test_text: html });
    // this.props.setText(this.state.test_text)
    
  }
  
  saveText(){
    console.log(this.state.test_text)
    const {test_text} = this.state
    axios.post(`/test/createPost`, {test_text}).then( response => {
      console.log(response)
    })
  }
  
  render () {
    console.log(this.props.existing_text)
    console.log(this.state)
    return (
      <div>
        <ReactQuill 
          ref={(el) => { this.reactQuillRef = el }}
          theme={'snow'}
          onChange={this.handleChange}
          modules={Editor.modules}
          formats={Editor.formats}
          defaultValue={this.props.existing_text}
          value={this.state.test_text}
          placeholder="your next great post starts here" 
          style={{
            "height": "400px",
          }}
        />
        {/* <button onClick={() => this.saveText()} >save post</button> */}
      </div>
    )
  }
}

export default EditQuill;
