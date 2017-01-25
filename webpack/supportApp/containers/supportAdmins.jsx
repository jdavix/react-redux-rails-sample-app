import React from 'react'
import { browserHistory } from 'react-router'
import FullCrud from './recordCrud'

import t from 'tcomb-form'

const Roles = t.enums({
  admin: 'Admin',
  staff: 'Staff'
})

const AdminFormSchema = t.struct({
  email: t.String,
  password: t.String,
  password_confirmation: t.String,
  role: Roles
})

const AdminFormOptions = {
  fields: {
    email: {
      type:'text',
      config: {
        size:'lg'
      },
      error:'This field is required'
    },
    password: {
      type: 'password',
      config: {
        size:'lg'
      },
      error:'This field is required'
    },
    password_confirmation: {
      type: 'password',
      config: {
        size:'lg'
      },
      error:'This field is required'
    }
  }
}

export default class SupportAdminsCrud extends React.Component {
  render(){
    return(<FullCrud formTitle="New Team member"
                     formType={AdminFormSchema}
                     formOptions={AdminFormOptions}
                     hideFilters={true}
                     title="Support Admin Users"
                     namespace="admin_users"
                     useNamespaceOnRequest={true}
                     tableColumns={["created_at", "email", "last_sign_in_at"]}
                     collectionName="support_admins" {...this.props }
           />
          )
  }
}