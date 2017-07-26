import React from 'react'
import { Row, Col, Glyphicon, Jumbotron, Button,Alert } from 'react-bootstrap'
import AxleGroupFormStore from '../stores/axleGroupFormStore'
import AxleForm from './helpers/axleForm.js'
import Input from './helpers/Input.js'
import Select from './helpers/Select.js'
import { observer } from 'mobx-react'
import AxlesContainer from './axlesContainer.js'
import Loader from 'react-loader'
import ConfirmationModal from './helpers/confirmationModal.js'
import { Link } from 'react-router-dom'

@observer export default class AxleGroupForm extends React.Component {
  constructor(props) {
    super(props)

    this.store = new AxleGroupFormStore()
  }

  componentDidMount() {
    const id = this.props.match.params.id

    if(id) {
     this.store.getAxleGroup(id)
    } else {
      this.store.newAxle()
    }
  }

  onHasTwinWheelChange(i, e) {
    this.store.axleGroup.axles[i].has_twin_wheel = e.target.checked
  }
  onHasXlWheelChange(i, e) { 
    this.store.axleGroup.axles[i].has_xl_wheel = e.target.checked 
  }
  onAllowedDistanceEndpoint1Change(i, e) {
    this.store.axleGroup.axles[i].allowed_distance_endpoint1 = e.target.value
  }

  onAllowedDistanceEndpoint2Change(i, e) {
    this.store.axleGroup.axles[i].allowed_distance_endpoint2 = e.target.value
  }


  render() {
    const message =  
      this.store.message ? 
      (<Col xs={12} className="text-center">
      <Alert bsStyle="warning">
        {this.store.message}
      </Alert>
    </Col>)

    :
      <p></p>

      const deleteButton = this.props.match.params.id || this.store.isCreatedAxleGroup ?
      (<Button 
        bsStyle="danger" 
        onClick={this.onDelete.bind(this)}
          style={{
            fontSize:32
          }}
        
      ><Glyphicon glyph="trash" /></Button>)
      : null
      const reqMessage =
      this.store.reqMessage && this.store.reqMessageVisible ?
      (<Col xs={12} className="text-center">
        <Alert bsStyle="success">
          {this.store.reqMessage}
        </Alert>
      </Col>)
      :
      null

      return(
        <Col className="container-fluid">
          <Row>
            <Jumbotron className="text-center">
              <h1>Grupo de Eixos</h1>
              <Link to={'/'}>
                <Button bsStyle="primary">
                  Lista de Grupos de Eixo
                </Button>
              </Link>
            </Jumbotron>
          </Row>
          <Loader loaded={this.store.loaded}>
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <Row>
                    <Col xs={12} sm={10}>
                      <h2>ID: {this.store.axleGroup.id}</h2>
                    </Col>
                    <Col xs={12} sm={2} className="text-right">
                      {deleteButton}
                    </Col>
                  </Row>
                  <Row>
                  <Input label="Descrição"
                    value={this.store.axleGroup.description}
                    onChange={this.onDescriptionChange.bind(this)}
                    validationFunction={(value) => {
                      if(!value)
                        return {
                          isValid: false,
                          message: 'Campo não pode estar em branco'
                        }

                      return { isValid: true, message: '' }
                    }}
                    ref={(input) => { this.descriptionInput = input }}
                  />
                  <div>
                    <AxlesContainer
                      ref={(input) => { this.axlesContainer = input }}
                      onNewAxleClick={this.onNewAxleClick.bind(this)}
                      axles={this.store.axleGroup.axles}
                      onHasTwinWheelChange={this.onHasTwinWheelChange.bind(this)}
                      onHasXlWheelChange={this.onHasXlWheelChange.bind(this)}
                      onAllowedDistanceEndpoint1Change={this.onAllowedDistanceEndpoint1Change.bind(this)}
                      onAllowedDistanceEndpoint2Change={this.onAllowedDistanceEndpoint2Change.bind(this)}
                      onAxleClose={this.onAxleClose.bind(this)}
                      axleMessage={this.store.axleMessage}
                    />
                  </div>
                  <Select label="Tipo de Grupo"
                    options={[
                      {
                        option: 'Simples', value:'SIMPLE',
                      },
                      {
                        option:'Tandem', value: 'TANDEM'
                      }
                    ]}
                    value={this.store.axleGroup.axle_group_type}
                    onChange={this.onGroupTypeChange.bind(this)}
                    validationMessage="Selecione uma opção"
                    ref={(input) => {this.groupInput = input}}

                  />
                  <Input label="Peso permitido"
                    value={this.store.axleGroup.allowed_weight}
                    onChange={this.onAllowedWeightChange.bind(this)}
                    validationFunction={(value) => {
                      if(!value)
                        return { 
                          isValid: false,
                          message: 'Campo não pode estar em branco'
                        }
                      if(isNaN(value)) 
                        return {
                          isValid: false,
                          message: 'Campo deve receber apenas números'
                        }

                      return { isValid: true, message: '' }
                    }}
                    ref={(input) => { this.allowedWeightInput = input }}

                  />
                  {message}
                  {reqMessage}

                  <Button type="submit" bsStyle="primary" style={{
                    width:'100%'
                  }}>
                  Salvar
                  <Loader loaded={this.store.reqLoaded} />
                  <ConfirmationModal
                    header="Sistema"
                    question="Deseja realmente deletar o grupo de eixos?"
                    onDeny={this.denyDelete.bind(this)}
                    onConfirm={this.confirmDelete.bind(this)}
                    show={this.store.showDeleteConfirmationModal}
                  />
                </Button>
              </Row>

              </form>
            </Col>
          </Row>
        </Loader>
      </Col>
      )
  }

  onSubmit(e) {
    e.preventDefault()
    this.descriptionInput.onBlur()
    this.groupInput.onBlur()
    this.allowedWeightInput.onBlur()
    this.axlesContainer.summonOnBlur() 


    const id = this.props.match.params.id
    if(id)
      this.store.updateAxleGroup(id)
    else
      this.store.insertAxleGroup()

  }

  onIdChange(e) {
    this.store.axleGroup.id = e.target.value
  }

  onDescriptionChange(e) {
    this.store.axleGroup.description = e.target.value
  }

  onGroupTypeChange(e) {
    this.store.axleGroup.axle_group_type = e.target.value
  }

  onAllowedWeightChange(e) {
    this.store.axleGroup.allowed_weight = e.target.value
  }

  onNewAxleClick(e) {
    e.preventDefault()
    this.store.newAxle()
  }

  onAxleClose(i) {
    this.store.removeAxle(i)
  }

  onDelete() {
    this.store.showDeleteConfirmationModal = true
  }

  confirmDelete() {
    this.store.deleteAxleGroup().then(() => {
      this.props.history.push('/')
    })
  }

  denyDelete() {
    this.store.showDeleteConfirmationModal = false
  }

  
}

