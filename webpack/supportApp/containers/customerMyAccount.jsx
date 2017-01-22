import React from 'react'
import { Link } from 'react-router'

export default class CustomerMyAccount extends React.Component {
  render () {
    return (
      <div>
        <h2>My Account</h2>
        <a rel="nofollow" data-method="delete" href="/customers/sign_out">Sign Out</a>
      </div>)
  }
}