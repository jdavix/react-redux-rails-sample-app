import * as actions from './global'
import * as ActionTypes from './globalActionTypes.js'

describe('global actions', () => {
  it('should create an action to update auth token', () => {
    const value = 'awbcprivateauthToken'
    const expectedAction = {
      type: ActionTypes.UPDATE_AUTH_TOKEN,
      authToken: value
    }
    expect(actions.updateAuthToken(value)).to.be.eql(expectedAction)
  })

  it('should create an action to update current user attrs', () => {
    const value = {name:"test name"}
    const expectedAction = {
      type: ActionTypes.UPDATE_CURRENT_USER,
      currentUserAttrs: value
    }
    expect(actions.updateCurrentUser(value)).to.be.eql(expectedAction)
  })

  it('should create an action to update tickets', () => {
    const value = []
    const expectedAction = {
      type: ActionTypes.UPDATE_TICKETS,
      tickets: value
    }
    expect(actions.updateTickets(value)).to.be.eql(expectedAction)
  })

  it('should create an action to update viewingRecord state field', () => {
    const value = {id:1, subject:'a', description:'b'}
    const expectedAction = {
      type: ActionTypes.SHOW_TICKET,
      ticket: value
    }
    expect(actions.updateViewingRecord(value)).to.be.eql(expectedAction)
  })

  it('should create an action to update current selected filter', () => {
    const value = 'sent'
    const expectedAction = {
      type: ActionTypes.UPDATE_FILTER,
      filter: value
    }
    expect(actions.updateFilter(value)).to.be.eql(expectedAction)
  })

  it('should create an action to update current modal state', () => {
    const value = {showModal: false}
    const expectedAction = {
      type: ActionTypes.UPDATE_MODAL,
      modal: value
    }
    expect(actions.updateModal(value)).to.be.eql(expectedAction)
  })

  it('should create an action to update current flash state', () => {
    const value = {alertMessage: 'alrighty'}
    const expectedAction = {
      type: ActionTypes.UPDATE_FLASH,
      flash: value
    }
    expect(actions.updateFlash(value)).to.be.eql(expectedAction)
  })
})