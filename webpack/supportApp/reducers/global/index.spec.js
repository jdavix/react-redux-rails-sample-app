import reducer from './index'
import * as actionTypes from '../../actions/globalActionTypes'

describe('global reducer', () => {
  it('return initial state', () => {
    let state = {
      authToken: "tokenAuthPrivate",
      currentUserAttrs: null
    }
    expect(reducer.currentUserReducer(state, {type: actionTypes.UPDATE_AUTH_TOKEN, authToken: 'tokenAuthPrivate'})).to.be.eql(state)
  })
})