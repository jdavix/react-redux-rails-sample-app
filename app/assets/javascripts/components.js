import React from 'react';
import ReactDOM from 'react-dom';
import CustomersApp from './components/containers/customersApp.js';
import SupportApp from './components/containers/supportApp.js';

global.React = React
global.ReactDOM = ReactDOM
window.CustomersApp = global.CustomersApp = CustomersApp
