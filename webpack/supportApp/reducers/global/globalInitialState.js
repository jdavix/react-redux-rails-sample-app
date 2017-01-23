const initialState = {
  authToken: null,
  ticketStatuses: [ {id:"all", value: "All"},{ id: "sent", value: "Open"}, { id: "inprogress", value: "In Progress"}, {id: "resolved", value:"Resolved"} ]
}

export default initialState