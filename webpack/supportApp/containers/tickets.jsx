import React from 'react'
import { browserHistory } from 'react-router'
import FullCrud from './recordCrud'

/*Even though it is a simple component, 
this component can't be an stateless since need to delegate access to routes to its child
*/
export default class TicketsCrud extends React.Component {
  render(){
    return(<FullCrud title="Tickets" collectionName="tickets" { ...this.props }/>)
  }
}