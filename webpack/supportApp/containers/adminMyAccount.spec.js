import React from 'react'
import { shallow, mount, render } from 'enzyme'
import AdminMyAccount from './adminMyAccount'

describe('<AdminMyAccount />', () => {
  it('renders one signout link component', () => {
    const wrapper = shallow(<AdminMyAccount />)
    expect(wrapper.find('a#sign-out')).to.have.length(1)
    expect(wrapper.find('a#sign-out').prop('href')).to.be.eq('/admin_user_session/sign_out')
  })
})