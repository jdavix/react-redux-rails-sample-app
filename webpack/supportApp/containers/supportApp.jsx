import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, IndexRoute, IndexRedirect, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../store/configureStore'
import getInitialState from '../store/initialState'

import AdminTickets from './adminTickets'
import SupportAdmins from './supportAdmins'

import adminsDashboard from '../components/adminsDashboard'

import * as globalActions from '../actions/global'

const store = configureStore(getInitialState())

const history = syncHistoryWithStore(browserHistory, store)

export default class CustomersApp extends React.Component {
  constructor(props){
    super(props)
    store.dispatch(globalActions.updateAuthToken(this.props.sessionToken))
  }
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>

          <Route path="/admin" component={adminsDashboard} >
            <IndexRedirect to="/admin/tickets" />
            <Route path="/admin/tickets" component={AdminTickets} />
            <Route path="/admin/tickets/new" component={AdminTickets} />
            <Route path="/admin/tickets/:id" component={AdminTickets} />

            <Route path="/admin/support_admins" component={SupportAdmins} />
            <Route path="/admin/support_admins/new" component={SupportAdmins} />
            <Route path="/admin/support_admins/:id" component={SupportAdmins} />
          </Route>


        </Router>
      </Provider>
    )
  }
}