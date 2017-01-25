const initialState = {
  session: {
    authToken: null,
    currentUserAttrs: null
  },
  visual: {
    selectedFilter: "all",
    ticketStatuses: [ {id:"all", value: "All"},{ id: "sent", value: "Open"}, { id: "inprogress", value: "In Progress"}, {id: "resolved", value:"Resolved"} ],
    modal: {
      showModal: false,
      modalContentType: 'new'
    },
    flash: {
      alertStyle:'success',
      alertMessage: null
    }
  },
  ticketsCrud: {
    items: [],
    viewingRecord: null
  }
}

export default initialState