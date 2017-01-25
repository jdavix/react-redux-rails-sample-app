import React from 'react'
import { browserHistory } from 'react-router'
import Crud from './recordCrud'

import t from 'tcomb-form'

const EmergencyLevels = t.enums({
  low: 'Low',
  medium: 'Medium',
  high: 'High'
})

const TicketFormSchema = t.struct({
  subject: t.String,
  description: t.String,
  emergency_level: EmergencyLevels
})

const ticketFormOptions = {
  fields: {
    description: {
      type:'textarea',
      config: {
        size:'lg'
      },
      error:'This field is required'
    },
    subject: {
      config: {
        size:'lg'
      },
      error:'This field is required'
    },
    emergency_level: {
      config: {
        size:'lg'
      },
      error:'This field is required'
    }
  }
}

export default class TicketsCrud extends React.Component {
  render(){
    return(<Crud namespace="customer_portal"
                 formTitle="Open New Ticket"
                 formType={TicketFormSchema}
                 formOptions={ticketFormOptions}
                 tableColumns={["created_at", "subject", "status_label", "support_admin"]}
                 title="Tickets"
                 collectionName="tickets"
                 useNamespaceOnRequest={false}
                 { ...this.props }
          />)
  }
}