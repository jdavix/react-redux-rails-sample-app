import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, IndexRoute, IndexRedirect, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../store/configureStore'
import getInitialState from '../store/initialState'

import Tickets from './tickets'
import CustomerMyAccount from './customerMyAccount'
import DashboardWrapper from '../components/dashboardWrapper'

const store = configureStore(getInitialState())

const history = syncHistoryWithStore(browserHistory, store)

export default class CustomersApp extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>

          <Route path="/" component={DashboardWrapper} >
            <IndexRedirect to="/tickets" />
            <Route path="/tickets" component={Tickets} />
            <Route path="/tickets/new" component={Tickets} />
            <Route path="/tickets/:id" component={Tickets} />
            <Route path="/my-account" component={CustomerMyAccount} />
          </Route>


        </Router>
      </Provider>
    )
  }
}