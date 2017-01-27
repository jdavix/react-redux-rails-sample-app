import React from 'react'
import { Provider } from 'react-redux'

import { shallow, mount, render } from 'enzyme'
import AdminReport from './adminReport'
import SmartTable from './smartTable'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import configureMockStore from 'redux-mock-store'
import reducers from '../reducers'
import thunk from 'redux-thunk'

import getInitialState from '../store/initialState'

import ENV from '../config/env'

let mock = new MockAdapter(axios)

let items = [
    {
      id: 1, 
      created_at: 'Wed, Jan 21 - 2017', 
      resolved_at: 'Wed, Jan 21 - 2017', 
      subject: 'test-subject',
      description: 'this is a description', 
      status: 'resolved', 
      status_label: 'Resolved',
      emergency_level: 'medium', 
      support_admin: 'guy@email.com',
      answer: 'this was not a real problem, you had to refresh the page and clear cache'
    }
  ]

mock.onGet(`${ENV.API_URL}//admin_users/tickets/report?`).reply(200, {
  data: { records: items},
  status: 200,
  meta: {
    report_url: "http://testurl.com/file.pdf"
  }
})

//Setting up mock store:
const middlewares = [thunk]
let mockStore  = configureMockStore(middlewares)

let store = mockStore(getInitialState())

store.replaceReducer(reducers)

describe('<AdminReport />', () => {
  let wrapper = null
  let adminReport = null
  beforeEach((done) => {
    wrapper = mount(<Provider store={store}><AdminReport /></Provider>)
    adminReport = wrapper.find(AdminReport)

    setTimeout(() => {
        done()
    }, 1500)

  })
  it('renders an <SmartTable/> component with tableColumns prop', () => {
    expect(adminReport.find(SmartTable)).to.have.length(1)
  })

  //since I'm using redux-mock-store, state is not updated automatically, for reference see:
  //https://github.com/arnaudbenard/redux-mock-store/issues/71
  it('triggers load tickets action after mounting', () => {
    adminReport = wrapper.find(AdminReport)
    expect(store.getState().ticketsCrud.items, 2).to.be.eql(items)
  })
})