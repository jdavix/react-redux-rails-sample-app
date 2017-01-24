import React from 'react';
import SideMenu from './sideMenu.jsx'

export default class DashboardWrapper extends React.Component {
  render () {
    console.log(this.props.options)
    return (
      <div>
        <div className="col-sm-3 col-lg-2">
          <SideMenu options={this.props.options}/>
        </div>
        <div className="col-sm-9 col-lg-10">
          { this.props.children }
        </div>
      </div>
    )
  }
}