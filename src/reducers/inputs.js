export default (prevState = {}, action) => {
  // Add your action conditionals here
  if (action.type.slice(0, 13) === 'INPUT_CHANGE_') {
    const inputName = action.type.split('INPUT_CHANGE_')[1].toLowerCase()

    const inputObj = {
      value: action.data
    }

    const newState = {
      ...prevState
    }

    if (action.nested) {
      const nested = newState[inputName] ? newState[inputName] : {}
      const newNested = { ...nested }
      newNested[action.nested] = inputObj
      newState[inputName] = newNested
    } else {
      newState[inputName] = inputObj
    }
    return newState
  }

  return { ...prevState }
}
