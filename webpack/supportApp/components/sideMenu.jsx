import React from 'react';
import { Link } from 'react-router'

export default class SideMenu extends React.Component {
  render () {
    return (
      <nav className="navbar navbar-default navbar-fixed-side">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <span className="navbar-brand">SupportApp</span>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/tickets">
                <span className="item-text">Tickets</span>
                <i className="item-icon fa fa-question-circle" aria-hidden="true"></i>
              </Link>
            </li>
            <li>
              <Link to="my-account">
                <span className="item-text">My Account</span>
                <i className="item-icon fa fa-user" aria-hidden="true"></i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}