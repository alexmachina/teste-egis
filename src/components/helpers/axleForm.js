import React from 'react'
import Input from './Input.js'
import Select from './Select.js'
import {Glyphicon, Col, Row, Button, Alert } from 'react-bootstrap'


let formStyle = {
  backgroundColor:'#16a085',
  marginBottom:'15px',
  padding:10
}

export default class AxleForm extends React.Component {
  blurry() {
    this.allowedDistanceEndpoint1.onBlur()
    this.allowedDistanceEndpoint2.onBlur()
  }
  render() {

    return(
      <Col style={formStyle} xs={12} lg={4}>
          <div className="inside">
            <Row>
              <Col xs={9}>
                <h3>Posição {this.props.position}</h3>
              </Col>
              <Col xs={3} className="no-padding text-right">
                <Button style={{
                  marginRight:5,

                }}  onClick={this.props.onClose} bsStyle="danger">
                <Glyphicon glyph="trash" />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
            <label>Possui rodas gêmeas?</label>
            <input type="checkbox"
              name="has_twin_wheel"
              onChange={this.props.onHasTwinWheelChange}
              checked={this.props.has_twin_wheel}
              className="form-control"


            />
          </Col>
          </Row>
          <Row>
          <Col xs={12}>
            <label>Possui roda extra grande?</label>
            <input type="checkbox"
              name="has_xl_wheel"
              onChange={this.props.onHasXlWheelChange}
              checked={this.props.has_xl_wheel}
              className="form-control"
            />
            <Input
              label="Intervalo de Distância 1(cm)"
              value={this.props.allowed_distance_endpoint1}
              onChange={this.props.onAllowedDistanceEndpoint1Change}
              validationFunction={(value) => {
                if (!value && value !== 0)
                  return { 
                    isValid: false,
                    message: 'Campo não pode estar em branco!'
                  }
                if (isNaN(value))
                  return {
                    isValid: false,
                    message: 'Campo deve receber apenas números'
                  }

                return { isValid: true, message: ''}
              }}
              ref={(input) => this.allowedDistanceEndpoint1 = input}
            />
            <Input 
              label="Intervalo de Distância 2(cm)"
              value={this.props.allowed_distance_endpoint2}
              onChange={this.props.onAllowedDistanceEndpoint2Change}
              validationFunction={(value) => {
                console.log(value)
                if (!value && value !== 0)
                  return { 
                    isValid: false,
                    message: 'Campo não pode estar em branco!'
                  }
                if (isNaN(value))
                  return {
                    isValid: false,
                    message: 'Campo deve receber apenas números'
                  }

                return { isValid: true, message: ''}
              }}
              ref={(input) => {this.allowedDistanceEndpoint2 = input}}
            />


        </Col>
      </Row>
    </div>
    </Col>
    )
  }
}
