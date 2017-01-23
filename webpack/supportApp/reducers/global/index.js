import {
  UPDATE_CURRENT_USER,
  UPDATE_AUTH_TOKEN,
  LOCAL_CACHE_FAILURE,
  UPDATE_TICKETS,
  UPDATE_FILTER,
  SHOW_TICKET,
  USER_LOGOUT
} from '../../actions/globalActionTypes'
/*
* Reducer Initial State
*/
import initialState from './globalInitialState'

let currentUserReducer = function(state = initialState["session"], action) {
  switch( action.type ) {
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUserAttrs: action.currentUserAttrs
      }
    case UPDATE_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.authToken
      }
    case LOCAL_CACHE_FAILURE:
      return {
        ...state,
        localCacheError: action.error
      }
    case USER_LOGOUT:
      return {
        ...state,
        ...initialState
      }
  }
  return state
}

let ticketsReducer = function(state = initialState["ticketsCrud"], action) {
  switch( action.type ) {
    case UPDATE_TICKETS:
      return {
        ...state,
        items: action.tickets
      }
    case SHOW_TICKET:
      return {
        ...state,
        viewingRecord: action.ticket
      }
  }
  return state
}

let visualReducer = function(state = initialState["visual"], action) {
  switch( action.type ) {
    case UPDATE_FILTER:
      return {
        ...state,
        selectedFilter: action.filter
      }
  }
  return state
}

const reducers = {
  currentUserReducer: currentUserReducer,
  ticketsReducer: ticketsReducer,
  visualReducer: visualReducer
}

export default reducers