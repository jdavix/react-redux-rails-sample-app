import axios from 'axios'

import {
  REQUEST_BEFORE_START,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  REQUEST
} from './requestActionTypes'

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
    return axios.request({
              url: `${ENV.API_URL}/${path}`,
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              data: params
            })
      .then( (response) => {
        if (response.status >= 200 && response.status <= 299) {

          let json = response.data

          dispatch( requestSuccess( json.data ) )

          actionsCallback(json)

        } else {
          dispatch( requestFailure( response.data.data ) )
          actionsCallback(null)
        }
        
      })
      .catch( (error) => {
        dispatch( requestFailure(error.response.data) )
        actionsCallback(null)
      })
  }
}

export function getRequest(path, params, actionsCallback) {
  let paramsToS = ""
  for (let param in params) {
    if (params[param]) {
      paramsToS+= `${param}=${params[param]}&`
    }
  }

  params = paramsToS

  return dispatch => {
    dispatch(requestBeforeStart())
    return axios.request({
              url: `${ENV.API_URL}/${path}?${params}`,
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            })
      .then( (response) => {
        if (response.status >= 200 && response.status <= 299) {

          let json = response.data

          dispatch( requestSuccess( json.data ) )

          actionsCallback(json)

        } else {
          dispatch( requestFailure( response.json() ) )
          actionsCallback(null)
        }
        
      })
      .catch( (error) => {
        console.log("ERROR")
        console.log(error)
        dispatch( requestFailure({errors: error.message}) )
        actionsCallback(null)
      })
  }
}
