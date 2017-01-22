import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as globalActions from '../actions/global'
import * as requestActions from '../actions/request'

import { Link } from 'react-router'
import {Table, Thead, Th, Tr, Td} from 'reactable'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import { browserHistory } from 'react-router'
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

const data = [
        { id:1, subject: 'This is a test 01', status: 'pending', created_at: 'Oct 24 2016 04:01pm' },
        { id:2, subject: 'lorem a problem tha 04',  status: 'in-progress', created_at: 'Oct 24 2016 04:02pm' },
        { id: 3, subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm' }
       ]

class Tickets extends React.Component {
  constructor(props){
    super(props)
    this.showActionModal = this.showActionModal.bind(this)
    this.closeModal   = this.closeModal.bind(this)
    this.setModalState = this.setModalState.bind(this)
    this.getModalSettings = this.getModalSettings.bind(this)
    this.newTicket = this.newTicket.bind(this)
    this.showTicket = this.showTicket.bind(this)
    this.createTicket = this.createTicket.bind(this)
    this.loadFilters = this.loadFilters.bind(this)
    this.state = {
      showModal: false,
    }
  }

  closeModal() {
    this.setState({
      ...this.state,
      showModal: false,
      modalTitle:null
    })
    browserHistory.push("/tickets")
  }

  newTicket() {
    browserHistory.push("/tickets/new")
    this.setState({
      ...this.state,
      showModal: true,
      modalTitle: this.getModalSettings("/tickets/new").title,
      modalContentType:'new'
    })
  }

  showTicket(id) {
    browserHistory.push("/tickets/:id")
    this.setState({
      ...this.state,
      showModal: true,
      modalTitle: this.getModalSettings("/tickets/:id").title,
      modalContentType:'show'
    })
  }

  componentDidMount() {
    this.setModalState()
  }

  createTicket() {
    var formFields = this.refs.form.getValue();
    if (formFields) { // if validation fails, value will be null

      this.props.requestActions.postRequest("tickets/", {
        ticket: {
          ...formFields
        }
      }, (response) => {
        if (response) {
          alert("ticket created successfully")
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
        field_errors = jsonError.meta.fields_errors
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
      return(<form>
        <t.form.Form
          ref="form"
          type={TicketFormSchema}
          options={ticketFormOptions}
        />
      </form>)
    } else if (this.state.modalContentType == "show"){
      <div>
        <h5>Object Attributes</h5>
      </div>
    }
  }

  showActionModal() {
    return(
      <Modal show={this.state.showModal } onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.modalBody()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button onClick={this.createTicket} bsStyle="primary">Save & Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  loadFilters() {
    let filters = [ {id:"all", value: "All"},{ id: "open", value: "Open"}, { id: "in-progress", value: "In Progress"}, {id: "resolved", value:"Resolved"} ]
    filters = filters.map((item) => { return (<option key={item.id} value={item.id}>{item.value}</option>) } )
    return(
      <div className="col-md-3">
        <span>Filter by Status: </span>
        <select className="form-control">
          {filters}
        </select>
      </div>
    )
  }

  render () {
    return (<div>
              <h2>Tickets</h2>
              <div className="row collection-actions">
                <div className="col-md-12">
                  {this.loadFilters()}
                  <Button onClick={this.newTicket} bsStyle="primary" bsSize="large" id="add-new-ticket">Open New</Button>
                </div>
              </div>
              <Table className="table"
                     sortable={['subject', 'status', 'created_at']}
                     defaultSort={{column: 'created_at', direction: 'desc'}}
                     itemsPerPage={10}
                     noDataText="no records found"
              >
                <Thead>
                  <Th column="created_at">
                    Created At
                  </Th>
                  <Th column="subject">
                    Subject
                  </Th>
                  <Th column="status">
                    Status
                  </Th>
                  <Th column="action">

                  </Th>
                </Thead>
                {data.map((row) => {
                  return (
                      <Tr key={row.id}>
                          <Td column="created_at">{row.created_at}</Td>
                          <Td column="subject">{row.subject}</Td>
                          <Td column="status">{row.status}</Td>
                          <Td column="action">
                            <span>
                              <a onClick={ () => this.showTicket(row.id) }>View</a> | 
                              <a>Cancel</a>
                            </span>
                          </Td>
                      </Tr>
                  )
                })}
              </Table>
              { this.showActionModal() }
            </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.global,
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