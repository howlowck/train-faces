import { SET_PERSON_GROUPS } from 'actions/group'

export default (prevState = [], action) => {
  // Add your action conditionals here
  if (action.type === SET_PERSON_GROUPS) {
    return action.data
  }
  return [ ...prevState ]
}
