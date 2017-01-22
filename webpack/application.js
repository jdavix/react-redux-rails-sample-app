import React from 'react'
import ReactDOM from 'react-dom'
import CustomersApp from './supportApp/containers/customersApp.jsx'


//TODO: make the below in a cicle
var appContainer = document.getElementById('app-container')
ReactDOM.render(
  <CustomersApp sessionToken={appContainer.dataset.sessionToken}/>,
  appContainer
)

