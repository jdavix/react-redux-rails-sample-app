import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, IndexRoute, IndexRedirect, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from '../store/configureStore'
import getInitialState from '../store/initialState'

import Tickets from './tickets'

import CustomerMyAccount from './customerMyAccount'
import customersDashboard from '../components/customersDashboard'

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

          <Route path="/customer_portal" component={customersDashboard} >
            <IndexRedirect to="/customer_portal/tickets" />
            <Route path="/customer_portal/tickets" component={Tickets} />
            <Route path="/customer_portal/tickets/new" component={Tickets} />
            <Route path="/customer_portal/tickets/:id" component={Tickets} />
            <Route path="/customer_portal/my-account" component={CustomerMyAccount} />
          </Route>


        </Router>
      </Provider>
    )
  }
}