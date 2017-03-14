import { connect } from 'react-redux'
import PersonPage from './PersonPage'
import { inputChangeNewFaceImage } from 'actions/webcam'
import { deletePerson, requestGetPerson, setAPerson } from 'actions/person'
import { inputChangeNewFaceUserData, createFaceWithData } from 'actions/face'
import { closeModal } from 'actions/ui'

const mapStateToProps = (state, { params }) => ({
  person: state.persons[params.groupId].find((person) => person.personId === params.personId),
  capturedImage: state.inputs.new_face_image ? state.inputs.new_face_image.value : '',
  newFaceUserData: state.inputs.new_face_user_data ? state.inputs.new_face_user_data.value : ''
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCaptureWebcamClick: (data) => {
    dispatch(inputChangeNewFaceImage(data))
  },
  onModalClose: () => {
    dispatch(inputChangeNewFaceImage(null))
  },
  onDeletePerson: () => {
    const { groupId, personId } = ownProps.params
    const { router } = ownProps
    dispatch(deletePerson(groupId, personId))
    router.push(`person-groups/${groupId}`)
  },
  onChangeUserData: (value) => {
    dispatch(inputChangeNewFaceUserData(value))
  },
  dispatch
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { capturedImage, newFaceUserData } = stateProps
  const { dispatch } = dispatchProps
  const { groupId, personId } = ownProps.params

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onCreateFaceSubmit: (event) => {
      event.preventDefault()
      const processedUserData = newFaceUserData === '' ? newFaceUserData : JSON.parse(newFaceUserData)
      dispatch(createFaceWithData(groupId, personId, capturedImage, processedUserData))
        .then((data) => {
          dispatch(inputChangeNewFaceImage(''))
          dispatch(inputChangeNewFaceUserData(''))
          dispatch(closeModal('newFaceWebcamModal'))
        })
        .then(() => {
          return dispatch(requestGetPerson(groupId, personId))
        })
        .then((person) => {
          dispatch(setAPerson(groupId, personId, person))
        })
    }
  }
}

const PersonPageContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(PersonPage)

export default PersonPageContainer
