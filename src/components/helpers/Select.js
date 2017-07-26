import React from 'react';

export default class Select extends React.Component{
  constructor(props) {
    super(props);
    this.state = { validationMessage: '' }
  }
  onBlur(e) {
    if(!this.props.value) 
      this.setState({validationMessage: this.props.validationMessage})

  }
  onChange(e) {
    this.props.onChange(e);
    if(!e.target.value) {
      this.setState({validationMessage: this.props.validationMessage});
    } else {
      this.setState({validationMessage: '', value: e.target.value})
    }
  }

  render() {
    let validationSpan;

    if(this.state.validationMessage) {
      validationSpan =
        <span style={{color:'red'}}>{this.state.validationMessage}</span>
    }
    return(
      <div className="form-group">
        <label>{this.props.label}</label>
        <select value={this.props.value} className="form-control"
          onChange={this.onChange.bind(this)}
          onBlur={this.onBlur.bind(this)}
        >

        <option value="">--- Select ---</option>
        {this.props.options.map((o,i) => {
          o.option = o.option ? o.option : o.value 
          return <option key={i} value={o.value}>{o.option}</option>
        })}
      </select>
      <div>
        {validationSpan}
      </div>
    </div>
    )
  }
}
