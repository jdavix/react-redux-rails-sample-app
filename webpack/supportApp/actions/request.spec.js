import * as actions from './request'
import * as ActionTypes from './requestActionTypes.js'

describe('global actions', () => {
  it('should create an action to update request before start state', () => {
    const expectedAction = {
      type: ActionTypes.REQUEST_BEFORE_START,
    }
    expect(actions.requestBeforeStart()).to.be.eql(expectedAction)
  })

  it('should create an action to record the request success', () => {
    const value = [{name:"test name"}]
    const expectedAction = {
      type: ActionTypes.REQUEST_SUCCESS,
      payload: value
    }
    expect(actions.requestSuccess(value)).to.be.eql(expectedAction)
  })

  it('should create an action to record request failure', () => {
    const value = []
    const expectedAction = {
      type: ActionTypes.REQUEST_FAILURE,
      payload: value
    }
    expect(actions.requestFailure(value)).to.be.eql(expectedAction)
  })

})