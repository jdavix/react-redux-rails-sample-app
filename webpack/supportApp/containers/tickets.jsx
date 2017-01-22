import React from 'react';
import { Link } from 'react-router'
import {Table, Thead, Th} from 'reactable'
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
      }
    },
    subject: {
      config: {
        size:'lg'
      }
    },
    emergency_level: {
      config: {
        size:'lg'
      }
    }
  }
}

const data = [
        { subject: 'This is a test 01', status: 'pending', created_at: 'Oct 24 2016 04:00pm', action: "what" },
        { subject: 'lorem a problem tha 04',  status: 'in-progress', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'This is a test 01', status: 'pending', created_at: 'Oct 24 2016 04:00pm', action: "what" },
        { subject: 'lorem a problem tha 04',  status: 'in-progress', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'This is a test 01', status: 'pending', created_at: 'Oct 24 2016 04:00pm', action: "what" },
        { subject: 'lorem a problem tha 04',  status: 'in-progress', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'This is a test 01', status: 'pending', created_at: 'Oct 24 2016 04:00pm', action: "what" },
        { subject: 'lorem a problem tha 04',  status: 'in-progress', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'This is a test 01', status: 'pending', created_at: 'Oct 24 2016 04:00pm', action: "what" },
        { subject: 'lorem a problem tha 04',  status: 'in-progress', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'This is a test 01', status: 'pending', created_at: 'Oct 24 2016 04:00pm', action: "what" },
        { subject: 'lorem a problem tha 04',  status: 'in-progress', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
        { subject: 'what no sum insump 06', status: 'resolved', created_at: 'Oct 24 2016 04:00pm', action:"what" },
       ]

export default class Tickets extends React.Component {
  constructor(props){
    super(props)
    this.showActionModal = this.showActionModal.bind(this)
    this.closeModal   = this.closeModal.bind(this)
    this.setModalState = this.setModalState.bind(this)
    this.getModalSettings = this.getModalSettings.bind(this)
    this.newTicket = this.newTicket.bind(this)
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
      modalTitle: this.getModalSettings("/tickets/new").title
    })
  }

  componentDidMount() {
    this.setModalState()
  }

  createTicket() {
    alert("new ticket created!")
  }

  setModalState(){
    let settings = this.getModalSettings(this.props.route.path)
    this.setState({
      ...this.state,
      showModal: settings.open,
      modalTitle: settings.title
    })
  }

  getModalSettings(path) {
    let settings = {open:false}
    switch(path){
      case "/tickets/new":
        settings = {
          title: "Open New Ticket",
          open: true
        }
        break;
      case "/tickets/:id":
        settings = {
          title: "Ticket Details",
          open: true
        }
        break;
    }
    return settings ;
  }

  showActionModal() {

    return(
      <Modal show={this.state.showModal } onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <t.form.Form
              ref="form"
              type={TicketFormSchema}
              options={ticketFormOptions}
            />
            <div className="form-group">
              <Button onClick={this.createTicket} bsStyle="primary" bsSize="large">Save & Add Other</Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button onClick={this.closeModal}>Save & Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  loadFilters() {
    let filters = [ {id:"all", value: "All"},{ id: "open", value: "Open"}, { id: "in-progress", value: "In Progress"}, {id: "resolved", value:"Resolved"} ]
    filters = filters.map((item) => { return (<option key={item.id} value={item.id}>{item.value}</option>) } )
    console.log(filters)
    return(
      <select>
        {filters}
      </select>
    )
  }

  render () {
    return (<div>
              <h2>Tickets</h2>
              <div className="row collection-actions">
                <div className="col-md-12">
                  {this.loadFilters()}
                  <Button onClick={this.newTicket} bsStyle="primary" bsSize="large" id="add-new-ticket">Add New</Button>
                  
                </div>
              </div>
              <Table className="table"
                     data={data}
                     sortable={['subject', 'status', 'created_at']}
                     defaultSort={{column: 'created_at', direction: 'desc'}}
                     itemsPerPage={10}
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
                    Action
                  </Th>
                </Thead>
              </Table>
              { this.showActionModal() }
            </div>
    )
  }
}