import {
  UPDATE_CURRENT_USER,
  UPDATE_AUTH_TOKEN,
  LOCAL_CACHE_FAILURE,
  USER_LOGOUT
} from '../../actions/globalActionTypes'
/*
* Reducer Initial State
*/
import initialState from './globalInitialState'

export default function currentUserReducer(state = initialState, action) {
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
