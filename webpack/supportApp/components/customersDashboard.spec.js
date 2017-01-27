import React from 'react'
import { shallow, mount, render } from 'enzyme'
import CustomersDashboard from './customersDashboard'
import DashboardWrapper from './dashboardWrapper'

describe('<CustomersDashboard />', () => {
  it('renders one <DashboardWrapper /> component', () => {
    const wrapper = shallow(<CustomersDashboard />)
    expect(wrapper.find(DashboardWrapper)).to.have.length(1)
  })
})