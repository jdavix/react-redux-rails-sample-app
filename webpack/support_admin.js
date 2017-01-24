import React from 'react'
import ReactDOM from 'react-dom'
import SupportApp from './supportApp/containers/supportApp.jsx'


//TODO: make the below in a cicle
var appContainer = document.getElementById('admin-app-container')
ReactDOM.render(
  <SupportApp sessionToken={appContainer.dataset.sessionToken}/>,
  appContainer
)