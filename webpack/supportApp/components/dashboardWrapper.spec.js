import React from 'react'
import { shallow, mount, render } from 'enzyme'
import DashboardWrapper from './dashboardWrapper'
import SideMenu from './sideMenu.jsx'

const menuOptions = [
  {path: "/admin_users/tickets", label:"Tickets" , iconClass: "fa-question-circle"},
  {path: "/admin_users/support_admins", label:"Support Admin Users" , iconClass: "fa-users"},
  {path: "/admin_users/reports", label:"Reports" , iconClass: "fa-line-chart"},
  {path: "/admin_users/my-account", label:"My Account" , iconClass: "fa-user"}
]

describe('<DashboardWrapper /> renders with default props', () => {

  it('renders <SideMenu> and give default menu otions', () => {
    const wrapper = shallow(<DashboardWrapper options={menuOptions}/>)
    expect(wrapper.find(SideMenu).prop('options')).to.be.eq(menuOptions)
  })
  it('renders inside content-div the children it', () => {
  const wrapper = shallow(<DashboardWrapper options={menuOptions}><div><p>Sample content</p></div></DashboardWrapper>)
  expect(wrapper.find('.content-div').contains(<div><p>Sample content</p></div>)).to.be.eq(true)
  })
})