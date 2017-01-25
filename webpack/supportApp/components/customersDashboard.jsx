import React from 'react'
import DashboardWrapper from './dashboardWrapper'

const menuOptions = [
  {path: "/customer_portal/tickets", label:"Tickets" , iconClass: "fa-question-circle"},
  {path: "/customer_portal/my-account", label:"My Account" , iconClass: "fa-user"}
]

const CustomersDashboard = (props) => {
  return <DashboardWrapper options={menuOptions}>{props.children}</DashboardWrapper>
}

export default CustomersDashboard