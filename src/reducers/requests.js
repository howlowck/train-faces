import { REQUEST_ALL_GUESTS } from 'actions/guest'
export default (prevState = [], action) => {
  if (action.type === REQUEST_ALL_GUESTS) {
    [...prevState, { method: 'GET', message: 'getting guests' }]
  }

  return [ ...prevState ]
}
