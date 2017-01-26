import React from 'react'
import DashboardWrapper from './dashboardWrapper'

const menuOptions = [
  {path: "/admin_users/tickets", label:"Tickets" , iconClass: "fa-question-circle"},
  {path: "/admin_users/support_admins", label:"Support Admin Users" , iconClass: "fa-users"},
  {path: "/admin_users/reports", label:"Reports" , iconClass: "fa-line-chart"},
  {path: "/admin_users/my-account", label:"My Account" , iconClass: "fa-user"}
]

const AdminDashboard = (props) => {
  return <DashboardWrapper options={menuOptions}>{props.children}</DashboardWrapper>
}

export default AdminDashboard