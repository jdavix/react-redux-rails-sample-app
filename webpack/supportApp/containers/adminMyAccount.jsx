import React from 'react'
import { Link } from 'react-router'

export default class AdminMyAccount extends React.Component {
  render () {
    return (
      <div>
        <h2>My Account</h2>
        <a id="sign-out"rel="nofollow" data-method="delete" href="/admin_user_session/sign_out">Sign Out</a>
      </div>)
  }
}