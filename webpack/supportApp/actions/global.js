import {
  UPDATE_CURRENT_USER,
  UPDATE_AUTH_TOKEN,
  UPDATE_TICKETS,
  UPDATE_FILTER,
  SHOW_TICKETS
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

export function updateTickets(tickets) {
  return {
    type: UPDATE_TICKETS,
    tickets: tickets
  }
}

export function updateViewingTicket(ticket) {
  return {
    type: SHOW_TICKET,
    ticket: ticket
  }
}

export function updateFilter(filter) {
  return {
    type: UPDATE_FILTER,
    filter: filter
  }
}