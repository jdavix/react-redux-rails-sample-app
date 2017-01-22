import {
  UPDATE_CURRENT_USER,
  UPDATE_AUTH_TOKEN
} from './globalActionTypes'

export function updateCurrentUser(currentUser){
  return {
    type: UPDATE_CURRENT_USER,
    currentUserAttrs: currentUser
  }
}

export function updateAuthToken(authToken){
  return {
    type: UPDATE_AUTH_TOKEN,
    authToken: authToken
  }
}

export function keepCurrentUser(currentUser, callback = function() {}){
  return (dispatch) => {
    dispatch(updateCurrentUser(currentUser))
    callback()
  }
}

export function keepAuthToken(authToken) {
  return (dispatch) => {
    dispatch(updateAuthToken(authToken))
  }
}