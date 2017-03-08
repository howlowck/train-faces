import { RECEIVE_ALL_GUESTS } from 'actions/guest'

export default (prevState = [], action) => {
  // Add your action conditionals here
  if (action.type === RECEIVE_ALL_GUESTS) {
    return [...action.data]
  }

  return [ ...prevState ]
}
