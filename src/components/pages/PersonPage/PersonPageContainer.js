import { connect } from 'react-redux'
import PersonPage from './PersonPage'
import { inputChangeNewFaceImage } from 'actions/webcam'
import { deletePerson } from 'actions/person'

const mapStateToProps = (state, { params }) => ({
  person: state.persons[params.groupId].find((person) => person.personId === params.personId),
  capturedImage: state.inputs.new_face_image ? state.inputs.new_face_image.value : ''
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
  }
})

const PersonPageContainer = connect(mapStateToProps, mapDispatchToProps)(PersonPage)

export default PersonPageContainer
