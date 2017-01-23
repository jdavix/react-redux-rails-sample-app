import reducers from './global'
import requestReducer from './request'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'



const rootReducer = combineReducers({
  session: reducers.currentUserReducer,
  visual:  reducers.visualReducer,
  ticketsCrud:  reducers.ticketsReducer,
  request: requestReducer,
  routing: routerReducer
})

export default rootReducer