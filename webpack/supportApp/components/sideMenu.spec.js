import React from 'react'
import { shallow, mount, render } from 'enzyme'
import SideMenu from './sideMenu'
import { Link } from 'react-router'

const menuOptions = [
  {path: "/admin_users/tickets", label:"Tickets" , iconClass: "fa-question-circle"},
  {path: "/admin_users/support_admins", label:"Support Admin Users" , iconClass: "fa-users"},
]

describe('<SideMenu />', () => {
  let wrapper = null
  beforeEach(()=>{
    wrapper = mount(<SideMenu options={menuOptions}/>)
  })

  it('maps received options into li elements', () => {
    expect(wrapper.find('.navbar-default').find('li')).to.have.length(2)
  })

  it('has li that contains a <Link/>', () => {
    expect(wrapper.find('.navbar-default li').find(Link)).to.have.length(2)
  })
  it("sends path attribute of options prop to each <Link/> as the 'to' prop", () => {
    expect(wrapper.find('.navbar-default').find(Link).map( link => link.prop("to"))).to.be.eql(["/admin_users/tickets", "/admin_users/support_admins"])
  })
  it("contains a navbar-header", () => {
    expect(wrapper.find('.navbar-header')).to.have.length(1)
  })
    it("contains the icon bar button", () => {
    expect(wrapper.find('.navbar-header button .icon-bar')).to.have.length(3)
  })
})