import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as globalActions from '../actions/global'
import * as requestActions from '../actions/request'

import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import {Table, Thead, Th, Tr, Td} from 'reactable'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import Alert from 'react-bootstrap/lib/Alert'
import Spinner from 'react-activity/lib/Spinner'

import t from 'tcomb-form'

import SmartTable from './smartTable'

class RecordCrud extends React.Component {

  constructor(props){
    super(props)

    this.showActionModal = this.showActionModal.bind(this)
    this.closeModal   = this.closeModal.bind(this)
    this.setModalState = this.setModalState.bind(this)
    this.getModalSettings = this.getModalSettings.bind(this)

    this.onNewRecord = this.onNewRecord.bind(this)
    this.onShowRecord = this.onShowRecord.bind(this)

    this.createRecord = this.createRecord.bind(this)

    this.flashMessages = this.flashMessages.bind(this)
    this.onDismissFlash = this.onDismissFlash.bind(this)

    this.handleFilterChange = this.handleFilterChange.bind(this)

  }

  /*
  Url to create a record via POST
  @returns {String} 
  */
  _createPath(useNamespace = true) {
    return this._indexPath(useNamespace)
  }

  /*
  Url to get list of records via GET
  @returns {String} 
  */
  _indexPath(useNamespace = true) {
    if (this.props.namespace && useNamespace == true) {
      return (`/${this.props.namespace}/${this.props.collectionName}`)
    } else {
      return (`/${this.props.collectionName}`)
    }
  }

  /*
  Url to list a record via GET
  @returns {String} 
  */
  _showPath(id, useNamespace = true) {
    if (this.props.namespace  && useNamespace == true) {
      return (`/${this.props.namespace}/${this.props.collectionName}/${id}`)
    } else {
      return (`/${this.props.collectionName}/${id}`)
    }
  }

  /*
  Url to display form to create new record
  @returns {String} 
  */
  _newPath(useNamespace = true) {
    if (this.props.namespace  && useNamespace == true) {
      return(`/${this.props.namespace}/${this.props.collectionName}/new`)
    } else {
      return(`/${this.props.collectionName}/new`)
    }
  }

  /* display flash messages
   @returns {Component} Returns  Flash message visible or invisible
  */
  flashMessages() {
    if (this.props.visual.flash.alertMessage) {
      return(
        <div className="row">
          <Alert bsStyle={this.props.visual.alertStyle} onDismiss={this.onDismissFlash}>
            <h4>Hey!</h4>
            <p>{this.props.visual.alertMessage}</p>
          </Alert>
        </div>
      )
    } else {
      return(<span></span>)
    }
  }

  onDismissFlash() {
    this.props.globalActions.updateFlash({alertMessage:null, alertStyle:null})
  }

   /* Modal related methods
    it handles if modal should be open or closed on first time page load
   */
  setModalState() {
    let settings = this.getModalSettings(this.props.route.path)

    if (this.props.params.id) {
      this.props.requestActions.getRequest(this._showPath(this.props.params.id, this.props.useNamespaceOnRequest), {
        auth_token: this.props.session.authToken
      }, (response) => {
        if (response) {

          this.props.globalActions.updateViewingRecord(response.data)
          this.props.globalActions.updateModal(
            {
              showModal: settings.open,
              modalTitle: settings.title,
              modalContentType: settings.modalContentType,
            }
          )
        }
      })
    } else {
      this.props.globalActions.updateModal(
        {
          showModal: settings.open,
          modalTitle: settings.title,
          modalContentType: settings.modalContentType
        }
      )
    }
  }

  getModalSettings(path) {
    let settings = {open:false, modalContentType: "new"}

    switch(path){
      case (this._newPath()):
        settings = {
          title: this.props.formTitle,
          open: true,
          modalContentType: 'new'
        }
        break;
      case (this._showPath(":id")):
        settings = {
          title: "Details",
          open: true,
          modalContentType: 'show'
        }
        break;
    }
    return settings ;
  }

  closeModal() {
    this.props.globalActions.updateModal(
      {
        showModal: false,
        modalTitle:null
      }
    )
    browserHistory.push(this._indexPath())
  }

  // it displays Modal with form for creating new record
  onNewRecord() {
    browserHistory.push(this._newPath())
    this.props.globalActions.updateModal(
      {
        showModal: true,
        modalTitle: this.getModalSettings(this._newPath()).title,
        modalContentType:'new'
      }
    )
  }

  //it displays Modal with record details
  onShowRecord(row) {
    browserHistory.push(this._showPath(row.id))

    this.props.globalActions.updateViewingRecord(row)

    this.props.globalActions.updateModal(
      {
        showModal: true,
        modalTitle: this.getModalSettings(this._showPath(":id")).title,
        modalContentType:'show',
      }
    )
  }

  //it defines the crud view modal body
  modalBody() {
    if (this.props.visual.modal.modalContentType == "new") {
      return this._newRecordView()
    } else {
      if (this.props.visual.modal.modalContentType == "show") {
        return this._showRecordView()
      }
    }
  }

  _showRecordContent() {
    let recordFields = []
    let field = null
    for(field in this.props.crud.viewingRecord) {
      recordFields.push(
        <div key={field} className="row">
          <div className="col-md-6 text-right">{`${field}:`}</div><div className="col-md-6">{this.props.crud.viewingRecord[field]}</div>
        </div>
      )
    }
    return(
      <div className="record-show">
        { recordFields }
      </div>
    )
  }

  /*to populate modal with show view
  @returns {Component} Returns content for the main view modal body
  */
  _showRecordView() {
    if (this.props.crud.viewingRecord) {
      return(<span>
        <Modal.Body>
          {this._showRecordContent()}
          {this.props.appendToShowView(this.props.crud.viewingRecord) }
        </Modal.Body>
        <Modal.Footer>
          <span>
            <Button onClick={this.closeModal}>Close</Button>
          </span>
        </Modal.Footer>
      </span>)
    }
  }

  //to puplate modal body with form view
  _newRecordView() {
      return (
        <span>
          <Modal.Body>
            <form>
              <t.form.Form
                ref="form"
                type={this.props.formType}
                options={this.props.formOptions}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <span>
              <Button onClick={this.closeModal}>Cancel</Button>
              <Button onClick={this.createRecord} bsStyle="primary">Save & Close</Button>
            </span>
          </Modal.Footer>
        </span>
      )
  }

  //modal for main crud view
  showActionModal() {
    return(
      <Modal show={this.props.visual.modal.showModal } onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.visual.modal.modalTitle}</Modal.Title>
        </Modal.Header>
        { this.modalBody() }
      </Modal>
    )
  }

  //initial data load
  componentDidMount() {
    this.loadRecords()
    this.setModalState()
  }

  //it queries the server for updating the main table view
  loadRecords(statusFilter = null) {
    statusFilter = statusFilter || this.props.visual.selectedFilter
    this.props.requestActions.getRequest(this._indexPath(this.props.useNamespaceOnRequest), {
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

  //it creates new record and updates the main table view to reflect the created record
  createRecord() {
    var formFields = this.refs.form.getValue();
    if (formFields) { // if validation fails, value will be null

      this.props.requestActions.postRequest(this._indexPath(this.props.useNamespaceOnRequest), {
        auth_token: this.props.session.authToken,
        ticket: {
          ...formFields
        }
      }, (response) => {
        if (response) {

          this.props.globalActions.updateModal({showModal:false})

          this.props.globalActions.updateFlash({
            alertMessage: response.metadata.message,
            alertStyle: "success"
            })

          browserHistory.push(this._indexPath())
          this.loadRecords()
        } else {
          this.showErrors()
        }
      })
    }
  }

  //populate form with errors if the server gives us each field error
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

  //content to send to smartTable component for displaying collection actions
  collectionActions() {
    if (this.props.hideCollectionActions !=true) {
      return(<Button onClick={this.onNewRecord} bsStyle="primary" bsSize="large" id="add-new-ticket">New</Button>)
    }
  }

  //status select change handler
  handleFilterChange(e) {
    let statusFilter = e.target.value
    this.loadRecords(statusFilter)
  }

  //status filter select
  filters() {
    //NOTE: pending to add support for custom filters per collection type
    if (this.props.hideFilters != true) {
      let options = this.props.visual.ticketStatuses
      options = options.map(
                              (item) => {
                                return (
                                  <option key={item.id}
                                          value={item.id}
                                  >
                                    {item.value}
                                  </option>
                                )
                              } 
                           )
      return(
        <div className="col-md-3">
          <span>Filter by Status: </span>
          <select className="form-control" onChange={this.handleFilterChange} defaultValue={this.props.visual.selectedFilter}>
            {options}
          </select>
        </div>
      )
    }
  }

  render () {
    return (<div className="main-content">
              {this.flashMessages()}
              <div className="row">
                <h2>{this.props.title}</h2>
                <SmartTable showAction={ this.onShowRecord } filters={ this.filters() } collectionActions={ this.collectionActions() }/>
                { this.showActionModal() }
              </div>
            </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
    crud: state.ticketsCrud,
    visual: state.visual,
    request: state.request,
    routing: state.routing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    globalActions: bindActionCreators(globalActions, dispatch),
    requestActions: bindActionCreators(requestActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordCrud)