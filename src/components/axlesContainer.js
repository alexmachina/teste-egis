import React from 'react'
import {Alert, Row, Col, Button, Glyphicon } from 'react-bootstrap'
import AxleForm from './helpers/axleForm.js'
import { observer } from 'mobx-react'


@observer
export default class AxlesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.axleForms = []
  }
  summonOnBlur() {
    this.axleForms.forEach(axleForm => {
      if(axleForm) 
        axleForm.blurry()
    })
    
    
  }
  render() {
    const alert = this.props.axleMessage ? 
      (<Col xs={12}><Alert bsStyle="warning">
        <p>{this.props.axleMessage}</p>
    </Alert></Col>)
      : null
    return(
      <Row>
        <Col xs={12} id="axles-panel" style={{
          backgroundColor:'#16a085',
          borderRadius:10
        }}>
        <Row>
          <Col xs={12} md={6} style={{
            color:'white',
            fontWeight:'bolder'
          }}>
          <h3>Eixos</h3>
        </Col>
        <Col xs={12} md={6} className="text-right" id="add-axle-button-container">
          <Button onClick={this.props.onNewAxleClick} id="add-axle-button" style={{
            backgroundColor:'#2ecc71',
            marginTop: '20px',
            color:'white'
          }}>
          <Glyphicon glyph="plus" />
        </Button>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12}>
        {this.props.axles.map((axle, i) => (
          <AxleForm
            key={i}
            ref={(input) => { this.axleForms[i] = input }}
            position={axle.position}
            has_twin_wheel={axle.has_twin_wheel}
            onHasTwinWheelChange={(e) => this.props.onHasTwinWheelChange(i, e)}
            has_xl_wheel={axle.has_xl_wheel}
            onHasXlWheelChange={(e) => this.props.onHasXlWheelChange(i, e)}
            allowed_distance_endpoint1={axle.allowed_distance_endpoint1}
            onAllowedDistanceEndpoint1Change={(e) => this.props.onAllowedDistanceEndpoint1Change(i, e)}
            allowed_distance_endpoint2={axle.allowed_distance_endpoint2}
            onAllowedDistanceEndpoint2Change={(e) => this.props.onAllowedDistanceEndpoint2Change(i, e)}
            onClose={(e) => this.props.onAxleClose(i)}
            axleMessage={this.props.axleMessage}
          />

        ))}
        {alert}
      </Col>
    </Row>
      </Col>
      </Row>
    )
    }
    }

