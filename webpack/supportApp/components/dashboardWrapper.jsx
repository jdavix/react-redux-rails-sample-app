import React from 'react';
import SideMenu from './sideMenu'

export default class DashboardWrapper extends React.Component {
  render () {
    return (
      <div>
        <div className="menu-div col-sm-3 col-lg-2">
          <SideMenu options={this.props.options}/>
        </div>
        <div className="content-div col-sm-9 col-lg-10">
          { this.props.children }
        </div>
      </div>
    )
  }
}