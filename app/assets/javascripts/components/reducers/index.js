import globalReducer from './global'
import requestReducer from './request'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'



const rootReducer = combineReducers({
  global: globalReducer,
  request: requestReducer,
  routing: routerReducer
})

export default rootReducer