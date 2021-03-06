import React from 'react'
import { shallow, mount, render } from 'enzyme'
import AdminsDashboard from './adminsDashboard'
import DashboardWrapper from './dashboardWrapper'

describe('<AdminsDashboard />', () => {
  it('renders one <DashboardWrapper /> component', () => {
    const wrapper = shallow(<AdminsDashboard />)
    expect(wrapper.find(DashboardWrapper)).to.have.length(1)
  })
})