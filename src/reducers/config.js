import { SET_CONFIG, LOAD_CONFIG } from 'actions/config'

export default (prevState = {}, action) => {
  // Add your action conditionals her
  if (action.type === SET_CONFIG) {
    let newConfig = {}
    newConfig[action.data.key] = action.data.value
    return {
      ...prevState,
      ...newConfig
    }
  }

  if (action.type === LOAD_CONFIG) {
    let newConfig = {}
    action.data.forEach((configObj) => {
      newConfig[configObj.key] = configObj.value
    })
    return newConfig
  }

  return { ...prevState }
}
