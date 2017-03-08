import { connect } from 'react-redux'
import { openModal, closeModal } from 'actions/ui'
import OpenModal from './OpenModal'
import uid from 'uid'

const mapStateToProps = (state, prevProps) => {
  const visibleState = state.ui[prevProps.uid] ? state.ui[prevProps.uid] : { visible: false }

  return {
    modalVisible: visibleState.visible
  }
}

const mapDispatchToProps = (dispatch, prevProps) => ({
  openFunc: (event) => {
    console.log(prevProps)
    dispatch(openModal(prevProps.uid))
  },
  closeModal: (event) => {
    dispatch(closeModal(prevProps.uid))
  }
})

const OpenModalContainer = connect(mapStateToProps, mapDispatchToProps)(OpenModal)

OpenModalContainer.defaultProps = {
  uid: uid()
}

export default OpenModalContainer
