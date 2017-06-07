import { SET_DETECTED_FACES, SET_IDENTIFIED_RESULTS, RESET_IDENTIFY_FACE } from 'actions/face'
import { SET_IDENTIFY_GROUP } from 'actions/group'
import { SET_IDENTIFY_INPUT_METHOD } from 'actions/ui'
export default (prevState = { faces: [], groupId: '', results: [] }, action) => {
  // Add your action conditionals here
  if (action.type === RESET_IDENTIFY_FACE) {
    return {
      ...prevState,
      faces: [],
      groupId: '',
      results: []
    }
  }

  if (action.type === SET_DETECTED_FACES) {
    return {
      ...prevState,
      faces: action.data
    }
  }

  if (action.type === SET_IDENTIFY_GROUP) {
    return {
      ...prevState,
      groupId: action.data
    }
  }

  if (action.type === SET_IDENTIFIED_RESULTS) {
    return {
      ...prevState,
      results: action.data
    }
  }

  if (action.type === SET_IDENTIFY_INPUT_METHOD) {
    return {
      ...prevState,
      method: action.data
    }
  }

  return { ...prevState }
}
