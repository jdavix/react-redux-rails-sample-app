import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as globalActions from '../actions/global'
import * as requestActions from '../actions/request'

import { Link } from 'react-router'
import {Table, Thead, Th, Tr, Td} from 'reactable'
import Button from 'react-bootstrap/lib/Button'
import Spinner from 'react-activity/lib/Spinner'

import { browserHistory } from 'react-router'

class SmartTable extends React.Component {
  constructor(props) {
    super(props)

    this.displayTableData = this.displayTableData.bind(this)
    this.refreshTable = this.refreshTable.bind(this)

    this.state = {
      tableData: []
    }

  }

  componentDidMount() {
    this.refreshTable()
  }

  displayTableData() {
    let data = this.state.tableData
    return (data.map((row) => {
    return (
        <Tr key={row.id}>
            <Td column="created_at">{row.created_at}</Td>
            <Td column="subject">{row.subject}</Td>
            <Td column="status">{row.status}</Td>
            <Td column="id">
              <span>
                <a onClick={ () => this.props.showAction(row) }>View</a>
              </span>
            </Td>
        </Tr>
    )
    }))
  }

  refreshTable(filter=null) {
    let statusFilter = filter || this.state.statusFilter
    this.props.requestActions.getRequest("tickets/", {
      auth_token: this.props.global.authToken,
      scope: statusFilter
    }, (response) => {
      if (response) {
        this.setState({
          ...this.state,
          tableData: response.data.records,
          statusFilter: statusFilter
        })
      } else {
        alert("error comunicating with the server")
      }
    })
  }

  render() {
    return(
      <span>
        <div className="row collection-actions">
          <div className="col-md-12">
            {this.props.filters}
            {this.props.collectionActions}
          </div>
        </div>
        { this.props.request.isFetching ? (
            <Spinner size={24} color="#286090"/>
          ) : (
            <Table className="table"
                   sortable={['subject', 'status', 'created_at']}
                   defaultSort={{column: 'created_at', direction: 'desc'}}
                   itemsPerPage={10}
                   noDataText="no records found"
            >
              <Thead>
                <Th column="created_at">
                  <span>Created At</span>
                </Th>
                <Th column="subject">
                  <span>Subject</span>
                </Th>
                <Th column="status">
                  <span>Status</span>
                </Th>
                <Th column="id">
                  Action
                </Th>
              </Thead>
              {this.displayTableData()}
            </Table>
          )
        }
      </span>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef:true})(SmartTable)