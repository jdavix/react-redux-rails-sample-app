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

class TicketsCrud extends React.Component {

  constructor(props){
    super(props)
    this.manageTicket = this.manageTicket.bind(this)
    this.updateTicket = this.updateTicket.bind(this)
  }

  updateTicket(ticket, options={}) {
    this.props.requestActions.postRequest(`/admin_users/tickets/${ticket.id}/update_status`, {
      auth_token: this.props.session.authToken,
      status_action: transitionAction[ticket.status],
      ...options
    }, (response) => {
    })
  }

  manageTicket(ticket) {
    return(
      <div className="row text-center">
        <a className="btn btn-lg btn-primary" onClick={ ()=>{this.updateTicket(ticket)} }>{transitionAction[ticket.status]}</a>
      </div>
    )
  }

  render(){
    return(<FullCrud title="Tickets"
                     namespace="admin_users"
                     collectionName="tickets"
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
    request: state.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    globalActions: bindActionCreators(globalActions, dispatch),
    requestActions: bindActionCreators(requestActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketsCrud)