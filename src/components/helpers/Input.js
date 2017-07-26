import React from 'react';

export default class Input extends React.Component{
  constructor(props) {
    super(props);
    this.state = { className: '', message: '' }
  }
  onBlur(value) {
    if(typeof this.props.validationFunction == 'function') {
      let validation = this.props.validationFunction(this.props.value)
      if(!validation.isValid) {
        this.setState({message: validation.message})
      } else {
        this.setState({message: ''})
      }
        
    }

  }
  render() {
    let message = this.state.message;
    let inputClassName = null
    let divClassName = null
    let divStyle = {}

    if(this.props.align == 'horizontal') {
      inputClassName= ''
      divClassName = ''
      divStyle = { display: 'inline' }
    }
    else {
      divClassName='form-group'
      inputClassName= 'form-control'
    }

    if(this.props.className) {
      divClassName = this.props.className
      divStyle={
        padding:'0 11 0 0',

        marginBottom:10
      }

    }

    return(
      <div className={divClassName} style={divStyle}>
        <label>{this.props.label}</label>
        <input type={this.props.type ? this.props.type : "text"}
          value={this.props.value}
          onChange={this.props.onChange}
          className={inputClassName}
          onBlur={(e) => { this.onBlur(e.target.value); }}

        />
        <span style={{color: 'red'}}>{message}</span>
      </div>
    )


  }
}
