import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../store/configureStore'
import getInitialState from '../store/initialState'

import Tickets from './tickets'
import CustomerMyAccount from './customerMyAccount'


const store = configureStore(getInitialState())

const history = syncHistoryWithStore(browserHistory, store)

export default class CustomersApp extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/tickets" component={Tickets} />
          <Route path="/my-account" component={CustomerMyAccount} />
        </Router>
      </Provider>
    )
  }
}