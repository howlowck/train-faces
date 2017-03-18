import { SET_TRAINING_STATUS } from 'actions/group'

export default (prevState = {}, action) => {
  // Add your action conditionals here
  if (action.type === SET_TRAINING_STATUS) {
    const { groupId, data } = action
    const cloned = {
      ...prevState
    }
    cloned[groupId] = data
    return cloned
  }

  return { ...prevState }
}
