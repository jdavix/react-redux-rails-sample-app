import {
  UPDATE_CURRENT_USER,
  UPDATE_AUTH_TOKEN,
  LOCAL_CACHE_FAILURE,
  USER_LOGOUT
} from './globalActionTypes'

import * as LocalCache from '../lib/localCache'

import { Actions } from 'react-native-router-flux'
import FBSDK from 'react-native-fbsdk'

const {
  LoginManager,
} = FBSDK;

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

export function localCacheFailure(error) {
  return {
    type: LOCAL_CACHE_FAILURE,
    error: error
  }
}

export function clearState() {
  return {
    type: USER_LOGOUT
  }
}

export function storeCurrentUser(currentUser, callback = function() {}){
  return (dispatch) => {
    LocalCache.saveObject('currentUser', currentUser).then((value) => {
      dispatch(updateCurrentUser(currentUser))
      callback()
    }).catch((error) => {
      dispatch( localCacheFailure(error) )
    })
  }
}

export function rehydrateCurrentUser(){
  return (dispatch) => {
    LocalCache.getValue('currentUser').then((value) => {
      if (value) {
        dispatch(updateCurrentUser(JSON.parse(value)))
      }
    }).catch((error) => {
      dispatch( localCacheFailure(error) )
    })
  }
}


export function storeAuthToken(authToken) {
  return (dispatch) => {
    LocalCache.saveValue('authToken', authToken).then((value) => {
      dispatch(updateAuthToken(authToken))
    }).catch((error) => {
      dispatch( localCacheFailure(error) )
    })
  }
}

export function rehydrateAuthToken(){
  return (dispatch) => {
    LocalCache.getValue('authToken').then((value) => {
      if (value) {
        dispatch(updateAuthToken(value))
      }
    }).catch((error) => {
      dispatch( localCacheFailure(error) )
    })
  }
}

export function logout() {
  return (dispatch) => {
    LocalCache.flush(['currentUser', 'authToken'])
    dispatch(clearState())
    LoginManager.logOut()
    // SplashScreen is the scene where authentication's scenes and all other scenes arrive when going to authentication, as it is a neutral point
    Actions.splashScreen()
  }
}
