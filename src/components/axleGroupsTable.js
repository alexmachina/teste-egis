import axleGroupStore from '../stores/axleGroupStore.js'
import React from 'react'
import { Row, Col, Jumbotron, Table, Button, Glyphicon } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader'


@observer
export default class AxleGroupsTable extends React.Component {
  constructor(props) {
    super(props)
    this.store = new axleGroupStore()
  }

  componentDidMount() {
    this.store.fetchAxleGroups()
  }
  render() {
    return(
      <Col className="container-fluid">
        <Row>
          <Jumbotron className="text-center">
            <h1>Grupos de Eixos</h1>
<Link to={'/grupo-de-eixo'}>
            <Button bsSize="lg" bsStyle="default">
              Novo Grupo de Eixos
            </Button>
          </Link>

          </Jumbotron>
        </Row>
        <Row>
                  </Row>

        <Row>
          <Col xs={12} md={10} mdOffset={1}>
            <Loader loaded={this.store.loaded}>
            <Table hover striped>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {this.store.axleGroups.map(axleGroup => (
                  <tr key={axleGroup.id}>
                    <td><Link to={`/grupo-de-eixo/${axleGroup.id}`}>{axleGroup.id}</Link></td>
                    <td>{axleGroup.description}</td>
                    <td>
                      <Link to={`/grupo-de-eixo/${axleGroup.id}`}>
                        <Button bsStyle="default">
                          <Glyphicon glyph="edit" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Loader>
        </Col>
      </Row>
    </Col>

    )
  }
}
