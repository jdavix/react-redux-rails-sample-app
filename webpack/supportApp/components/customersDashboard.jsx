import React from 'react'
import DashboardWrapper from './dashboardWrapper'

const menuOptions = [
  {path: "/customers/tickets", label:"Tickets" , iconClass: "fa-question-circle"},
  {path: "/customers/my-account", label:"My Account" , iconClass: "fa-user"}
]

const CustomersDashboard = (props) => {
  console.log(menuOptions)

  return <DashboardWrapper options={menuOptions} />
}

export default CustomersDashboard