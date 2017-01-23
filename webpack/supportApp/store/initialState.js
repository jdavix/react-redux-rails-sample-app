import globalInitialState from  '../reducers/global/globalInitialState'
import requestInitialState from  '../reducers/request/requestInitialState'

export default function getInitialState() {
  return {
    ...globalInitialState,
    request: requestInitialState
  }
}