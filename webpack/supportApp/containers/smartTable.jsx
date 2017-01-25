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
    this.displayTableHeader = this.displayTableHeader.bind(this)

  }

  _itemActions(row) {
    return(
      <Td key="id" column="id">
        <span>
          <a onClick={ () => this.props.showAction(row) }>View</a>
        </span>
      </Td>
    )
  }

  _tableRow(row) {
    let result = []
    let attribute = null
    for (attribute in row) {
      if (attribute!="id") {
        result.push(<Td key={attribute} column={attribute}>{row[attribute]}</Td>)
      }
    }
    result.push(this._itemActions(row))
    return result
  }

  _titleFor(field){
    let title = field.split("_")
    return title.join(" ")
  }

  displayTableHeader() {
    let result = []
    let fieldsFromRecord = this.props.ticketsCrud.items[0]
    if (fieldsFromRecord) {
      for (let field in fieldsFromRecord) {
        let title = this._titleFor(field)
        if (field!="id") {
          result.push(<Th key={field} column={field}><span>{title}</span></Th>)
        }
      }
      result.push(<Th key="id" column="id"><span>Actions</span></Th>)
      return(
        <Thead>
          { result }
        </Thead>
      )
    } else {
      return(<Thead />)
    }
  }

  displayTableData() {
    let data = this.props.ticketsCrud.items

    if (data.length > 0 ) {
      return (data.map((row) => {
        return (
          <Tr key={row.id} >
              { this._tableRow(row) }
          </Tr>
        )
      }))
    }
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
                   pageButtonLimit={5}
                   noDataText="no records found"
            >
              {this.displayTableHeader()}
              {this.displayTableData()}
              }
            </Table>
          )
        }
      </span>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ticketsCrud: state.ticketsCrud,
    request: state.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    globalActions: bindActionCreators(globalActions, dispatch),
    requestActions: bindActionCreators(requestActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartTable)