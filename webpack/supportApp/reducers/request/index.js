import {
  REQUEST_BEFORE_START,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  REQUEST
} from '../../actions/requestActionTypes'
/*
* Reducer Initial State
*/
import initialState from './requestInitialState'

export default function requestReducer(state = initialState, action) {
  switch( action.type ) {
    case REQUEST_BEFORE_START:
      return {
        ...state,
        errorResponse: null,
        isFetching: true
      }
    case REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorResponse: action.payload
      }
  }
  return state
}