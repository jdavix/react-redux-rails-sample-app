import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as globalActions from '../actions/global'
import * as requestActions from '../actions/request'

import { browserHistory } from 'react-router'
import FullCrud from './recordCrud'

const transitionAction = {
  sent: "start",
  inprogress: "resolve"
}

const transitionToSection = {
  start: {label:'In Progress', status: 'inprogress'},
  resolve: {label:'Resolved', status: 'resolved'}
}

class TicketsCrud extends React.Component {

  constructor(props){
    super(props)
    this.manageTicket = this.manageTicket.bind(this)
    this.updateTicket = this.updateTicket.bind(this)
    this.refreshAfterUpdate = this.refreshAfterUpdate.bind(this)
  }

  updateTicket(ticket, options={}) {
    let transition = transitionAction[ticket.status]

    this.props.requestActions.postRequest(`/admin_users/tickets/${ticket.id}/update_status`, {
      auth_token: this.props.session.authToken,
      status_action: transition,
      ...options
    }, (response) => {
      this.props.globalActions.updateModal({showModal:false})
      this.props.globalActions.updateFlash({alertMessage: `Ticket #${ticket.id} moved to ${transitionToSection[transition].label}`,
                                            alertStyle: "success"
                                           })
      browserHistory.push("/admin_users/tickets")
      this.props.globalActions.updateFilter(transitionToSection[transition].status)
      this.refreshAfterUpdate()
    })
  }

  manageTicket(ticket) {
    if (transitionAction[ticket.status]) {
      return(
        <div className="row text-center">
          <a className="btn btn-lg btn-primary" onClick={ ()=>{this.updateTicket(ticket)} }>{transitionAction[ticket.status]}</a>
        </div>
      )
    }
  }

  refreshAfterUpdate() {
    this.props.requestActions.getRequest("/admin_users/tickets", {
      auth_token: this.props.session.authToken,
      scope: this.props.visual.selectedFilter
    }, (response) => {
      if (response) {
        this.props.globalActions.updateTickets(response.data.records)
      } else {
        alert("error comunicating with the server")
      }
    })
    this.props.globalActions.updateFilter(statusFilter)
  }

  render(){
    return(<FullCrud title="Tickets"
                     namespace="admin_users"
                     collectionName="tickets"
                     tableColumns={["id", "created_at", "subject", "status_label", "support_admin"]}
                     hideCollectionActions={true}
                     useNamespaceOnRequest={true}
                     appendToShowView={this.manageTicket}
                     { ...this.props }
           />)
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
    request: state.request,
    visual: state.visual
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    globalActions: bindActionCreators(globalActions, dispatch),
    requestActions: bindActionCreators(requestActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketsCrud)