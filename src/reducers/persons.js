import { SET_PERSONS } from 'actions/person'

export default (prevState = {}, action) => {
  // Add your action conditionals here
  if (action.type === SET_PERSONS) {
    const { groupId, data: persons } = action
    const newPersons = { ...prevState }
    newPersons[groupId] = persons
    return newPersons
  }

  return { ...prevState }
}
