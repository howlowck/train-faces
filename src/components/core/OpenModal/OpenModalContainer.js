import { connect } from 'react-redux'
import { openModal, closeModal } from 'actions/ui'
import OpenModal from './OpenModal'
import uid from 'uid'

const mapStateToProps = (state, prevProps) => {
  const visibleState = state.ui[prevProps.name] ? state.ui[prevProps.name] : { visible: false }

  return {
    modalVisible: visibleState.visible
  }
}

const mapDispatchToProps = (dispatch, prevProps) => ({
  openFunc: (event) => {
    dispatch(openModal(prevProps.name))
  },
  closeModal: (event) => {
    dispatch(closeModal(prevProps.name))
    const { onModalClose } = prevProps
    if (onModalClose) {
      onModalClose()
    }
  }
})

const OpenModalContainer = connect(mapStateToProps, mapDispatchToProps)(OpenModal)

OpenModalContainer.defaultProps = {
  uid: uid()
}

export default OpenModalContainer
