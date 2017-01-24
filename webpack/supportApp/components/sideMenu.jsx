import React from 'react';
import { Link } from 'react-router'

export default class SideMenu extends React.Component {

  constructor(props){
    super(props)
  }



  showOptions() {
    console.log("showing options")
    console.log(this.props.options)
    if (this.props.options) {
      let items = this.props.options.map((item)=>{
                    let iconClass = `item-icon fa ${item.iconClass}`
                    return(
                              <li key={item.path}>
                                <Link to={item.path}>
                                  <span className="item-text">{item.label}</span>
                                  <i className={iconClass} aria-hidden="true"></i>
                                </Link>
                              </li>
                            )  
                    })
      return(
        <ul className="nav navbar-nav">
          {items}
        </ul>
      )
    }
  }

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
          {this.showOptions()}
        </div>
      </nav>
    )
  }
}