import React from 'react'
import DashboardWrapper from './dashboardWrapper'

const menuOptions = [
  {path: "/admin/tickets", label:"Tickets" , iconClass: "fa-question-circle"},
  {path: "/admin/my-account", label:"My Account" , iconClass: "fa-user"}
]

const AdminDashboard = (props) => {
  return <DashboardWrapper options={menuOptions}>{props.children}</DashboardWrapper>
}

export default AdminDashboard