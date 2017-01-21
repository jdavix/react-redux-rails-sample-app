import {
  REQUEST_BEFORE_START,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  REQUEST
} from './requestActionTypes'

import { Actions } from 'react-native-router-flux'

import ENV from '../config/env'

/*
* Login Actions Creators
*/
export function requestBeforeStart() {
  return {
    type: REQUEST_BEFORE_START
  }
}

export function requestSuccess(json) {
  return {
    type: REQUEST_SUCCESS,
    payload: json
  }
}

export function requestFailure(errorResponse) {
  return {
    type: REQUEST_FAILURE,
    payload: errorResponse
  }
}

export function postRequest(path, params, actionsCallback) {
  return dispatch => {
    dispatch(requestBeforeStart())
    return fetch(`${ENV.API_URL}/${path}`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(params)
            })
      .then( (response) => {
        if (response.status >= 200 && response.status <= 299) {

          json = JSON.parse(response._bodyText)

          dispatch( requestSuccess( json.data ) )

          actionsCallback(json.data)

        } else {
          dispatch( requestFailure( JSON.parse(response._bodyText) ) )
          actionsCallback(null)
        }
        
      })
      .catch( (error) => {
        dispatch( requestFailure({errors: error.message}) )
        actionsCallback(null)
      })
  }
}

export function getRequest(path, params, actionsCallback) {
  let paramsToS = ""
  for (let param in params) {
    paramsToS+= `${param}=${params[param]}&`
  }

  params = paramsToS

  return dispatch => {
    dispatch(requestBeforeStart())
    return fetch(`${ENV.API_URL}/${path}?${params}`, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            })
      .then( (response) => {
        if (response.status >= 200 && response.status <= 299) {

          json = JSON.parse(response._bodyText)

          dispatch( requestSuccess( json.data ) )

          actionsCallback(json.data)

        } else {
          dispatch( requestFailure( JSON.parse(response._bodyText) ) )
          actionsCallback(null)
        }
        
      })
      .catch( (error) => {
        dispatch( requestFailure({errors: error.message}) )
        actionsCallback(null)
      })
  }
}
