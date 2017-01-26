import React from 'react'
import { Link } from 'react-router'
import SmartTable from './smartTable'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as globalActions from '../actions/global'
import * as requestActions from '../actions/request'

class AdminReport extends React.Component {
  constructor(props) {
    super(props)
    this.loadReport = this.loadReport.bind(this)
    this.state = {
      reportUrl: null
    }
  }

  componentDidMount(){
    this.loadReport()
  }

  loadReport(){
    this.props.requestActions.getRequest("/admin_users/tickets/report", {
      auth_token: this.props.session.authToken
    }, (response) => {
      if (response) {
        this.props.globalActions.updateTickets(response.data.records)
        this.setState({reportUrl: response.meta.report_url})
      } else {
        alert("error comunicating with the server")
      }
    })
  }

  render () {
    return (
      <div>
        <h2>Reports</h2>
        <h3>Last Months Closed Tickets:</h3>
        {this.state.reportUrl ? <a href={this.state.reportUrl}>Download report</a> : null}
        <SmartTable tableColumns={["resolved_at", "subject", "status_label", "support_admin"]}/>
      </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminReport)