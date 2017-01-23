const initialState = {
  session: {
    authToken: null,
    currentUserAttrs: null
  },
  visual: {
    ticketStatuses: [ {id:"all", value: "All"},{ id: "sent", value: "Open"}, { id: "inprogress", value: "In Progress"}, {id: "resolved", value:"Resolved"} ],
  },
  ticketsCrud: {
    items: [],
    viewingRecord: null
  }
}

export default initialState