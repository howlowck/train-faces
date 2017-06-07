export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const SET_IDENTIFY_INPUT_METHOD = 'SET_IDENTIFY_INPUT_METHOD'
// Add Action String Constant Here (do not delete this line)

export const openModal = (data) => ({
  type: OPEN_MODAL,
  data
})

export const closeModal = (data) => ({
  type: CLOSE_MODAL,
  data
})

export const setIdentifyInputMethod = (data) => ({
  type: SET_IDENTIFY_INPUT_METHOD,
  data
})

// Add Action Creator Here (do not delete this line)
