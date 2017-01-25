import React from 'react'
import { Link } from 'react-router'

export default class AdminMyAccount extends React.Component {
  render () {
    return (
      <div>
        <h2>My Account</h2>
        <a rel="nofollow" data-method="delete" href="/support_admins/sign_out">Sign Out</a>
      </div>)
  }
}