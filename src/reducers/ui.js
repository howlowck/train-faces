import { OPEN_MODAL, CLOSE_MODAL } from 'actions/ui'

export default (prevState = {}, action) => {
  // Add your action conditionals here
  if (action.type === OPEN_MODAL) {
    let modalData = {}
    modalData[action.data] = { visible: true }
    return { ...prevState, ...modalData }
  }

  if (action.type === CLOSE_MODAL) {
    let modalData = {}
    modalData[action.data] = { visible: false }
    return { ...prevState, ...modalData }
  }

  return { ...prevState }
}
