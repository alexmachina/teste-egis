import React from 'react'
import { Modal, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types' 

class ConfirmationModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.header}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.props.question}
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => this.props.onConfirm()}>
            Sim
          </Button>
          <Button
            onClick={() => this.props.onDeny()}
          >
            Não
          </Button>
        </Modal.Footer>


      </Modal>
    )

  }
}

ConfirmationModal.propTypes = {
  header: PropTypes.string,
  question: PropTypes.string,
  show: PropTypes.bool,
  onConfirm: PropTypes.func,
  onDeny: PropTypes.func
}

export default ConfirmationModal
