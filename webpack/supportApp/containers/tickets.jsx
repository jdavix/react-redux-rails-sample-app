import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as globalActions from '../actions/global'
import * as requestActions from '../actions/request'

import { Link } from 'react-router'
import {Table, Thead, Th, Tr, Td} from 'reactable'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import Alert from 'react-bootstrap/lib/Alert'
import Spinner from 'react-activity/lib/Spinner'

import { browserHistory } from 'react-router'

import SmartTable from './smartTable'

import t from 'tcomb-form'

const EmergencyLevels = t.enums({
  low: 'Low',
  medium: 'Medium',
  high: 'High'
})

const TicketFormSchema = t.struct({
  subject: t.String,
  description: t.String,
  emergency_level: EmergencyLevels
})

const ticketFormOptions = {
  fields: {
    description: {
      type:'textarea',
      config: {
        size:'lg'
      },
      error:'This field is required'
    },
    subject: {
      config: {
        size:'lg'
      },
      error:'This field is required'
    },
    emergency_level: {
      config: {
        size:'lg'
      },
      error:'This field is required'
    }
  }
}

class Tickets extends React.Component {
  constructor(props){
    super(props)

    this.showActionModal = this.showActionModal.bind(this)
    this.closeModal   = this.closeModal.bind(this)
    this.setModalState = this.setModalState.bind(this)
    this.getModalSettings = this.getModalSettings.bind(this)
    this.newRecord = this.newRecord.bind(this)
    this.showRecord = this.showRecord.bind(this)
    this.createTicket = this.createTicket.bind(this)

    this.flashMessages = this.flashMessages.bind(this)
    this.onDismissFlash = this.onDismissFlash.bind(this)

    this.handleFilterChange = this.handleFilterChange.bind(this)

    this.state = {
      showModal: false,
      alertMessage: null
    }
  }

  flashMessages() {
    if (this.state.alertMessage) {
      return(
        <div className="row">
          <Alert bsStyle={this.state.alertStyle} onDismiss={this.onDismissFlash}>
            <h4>Hey!</h4>
            <p>{this.state.alertMessage}</p>
          </Alert>
        </div>
      )
    } else {
      return(<span></span>)
    }
  }

  onDismissFlash() {
    this.setState({
      ...this.state,
      alertMessage: null,
      alertStyle: null
    })
  }

  closeModal() {
    this.setState({
      ...this.state,
      showModal: false,
      modalTitle:null
    })
    browserHistory.push("/tickets")
  }

  newRecord() {
    browserHistory.push("/tickets/new")
    this.setState({
      ...this.state,
      showModal: true,
      modalTitle: this.getModalSettings("/tickets/new").title,
      modalContentType:'new'
    })
  }

  showRecord(row) {
    browserHistory.push(`/tickets/${row.id}`)
    this.setState({
      ...this.state,
      showModal: true,
      modalTitle: this.getModalSettings("/tickets/:id").title,
      modalContentType:'show',
      record: row
    })
  }

  componentDidMount() {
    //this.setModalState()
    this.loadRecords()
  }

  loadRecords(statusFilter = null) {
    statusFilter = statusFilter || this.props.visual.selectedFilter
    this.props.requestActions.getRequest("tickets/", {
      auth_token: this.props.session.authToken,
      scope: statusFilter
    }, (response) => {
      if (response) {
        this.props.globalActions.updateTickets(response.data.records)
      } else {
        alert("error comunicating with the server")
      }
    })
    this.props.globalActions.updateFilter(statusFilter)
  }

  createTicket() {
    var formFields = this.refs.form.getValue();
    if (formFields) { // if validation fails, value will be null

      this.props.requestActions.postRequest("tickets/", {
        auth_token: this.props.session.authToken,
        ticket: {
          ...formFields
        }
      }, (response) => {
        if (response) {
          this.setState({
            ...this.state,
            showModal: false,
            alertMessage: response.metadata.message,
            alertStyle: "success"
          })
          browserHistory.push("/tickets")
          this.loadRecords()
        } else {
          this.showErrors()
        }
      })
    }
  }

  showErrors(){
    var jsonError= this.props.request.errorResponse
    if (jsonError) {

      if (typeof jsonError.errors  === 'string' ) {
        alert(jsonError.errors)
      } else {
        field_errors = jsonError.metadata.fields_errors
        this.setState({
          ...this.state,
          options: {
            fields: this._addErrorsToFields(this.state.options.fields, field_errors)
          }
        })
      }
    }
  }

  _addErrorsToFields(formFields, errors) {
    newObject = {}
    for (var key in formFields) {
      if (errors[key]) {
        newObject[key] = {
          ...formFields[key],
          error: errors[key],
          hasError: true
        }
      } else {
        newObject[key] = {
          ...formFields[key]
        }
      }
    }
    return newObject;
  }

  setModalState(){
    let settings = this.getModalSettings(this.props.route.path)
    this.setState({
      ...this.state,
      showModal: settings.open,
      modalTitle: settings.title,
      modalContentType: settings.modalContentType
    })
  }

  getModalSettings(path) {
    let settings = {open:false}
    switch(path){
      case "/tickets/new":
        settings = {
          title: "Open New Ticket",
          open: true,
          modalContentType: 'new'
        }
        break;
      case "/tickets/:id":
        settings = {
          title: "Ticket Details",
          open: true,
          modalContentType: 'show'
        }
        break;
    }
    return settings ;
  }

  modalBody() {
    if (this.state.modalContentType == "new") {
      return (
        <span>
          <Modal.Body>
            <form>
              <t.form.Form
                ref="form"
                type={TicketFormSchema}
                options={ticketFormOptions}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <span>
              <Button onClick={this.closeModal}>Cancel</Button>
              <Button onClick={this.createTicket} bsStyle="primary">Save & Close</Button>
            </span>
          </Modal.Footer>
        </span>
      )
    } else {
      if (this.state.modalContentType == "show") {
        return(<span>
          <Modal.Body>
            <div className="record-show">
              <div className="row">
                <div className="col-md-6 text-right">Subject:</div><div className="col-md-6">{this.state.record.subject}</div>
              </div>
              <div className="row">
                <div className="col-md-6 text-right">Status:</div><div className="col-md-6">{this.state.record.status}</div>
              </div>
              <div className="row">
                <div className="col-md-6 text-right">Description:</div><div className="col-md-6">{this.state.record.description}</div>
              </div>
              <div className="row">
                <div className="col-md-6 text-right">Emergency Level:</div><div className="col-md-6">{this.state.record.emergency_level}</div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <span>
              <Button onClick={this.closeModal}>Close</Button>
            </span>
          </Modal.Footer>
        </span>)
      }
    }
  }

  showActionModal() {
    return(
      <Modal show={this.state.showModal } onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalTitle}</Modal.Title>
        </Modal.Header>
        { this.modalBody() }
      </Modal>
    )
  }

  collectionActions() {
    return(<Button onClick={this.newRecord} bsStyle="primary" bsSize="large" id="add-new-ticket">Open New</Button>)
  }

  handleFilterChange(e) {
    let statusFilter = e.target.value
    this.loadRecords(statusFilter)
  }

  filters() {
    let options = this.props.visual.ticketStatuses
    options = options.map((item) => { return (<option key={item.id} value={item.id}>{item.value}</option>) } )
    return(
      <div className="col-md-3">
        <span>Filter by Status: </span>
        <select className="form-control" onChange={this.handleFilterChange}>
          {options}
        </select>
      </div>
    )
  }

  render () {
    return (<div className="main-content">
              {this.flashMessages()}
              <div className="row">
                <h2>Tickets</h2>
                <SmartTable showAction={ this.showRecord } filters={ this.filters() } collectionActions={ this.collectionActions() }/>
                { this.showActionModal() }
              </div>
            </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
    visual: state.visual,
    request: state.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    globalActions: bindActionCreators(globalActions, dispatch),
    requestActions: bindActionCreators(requestActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)