import { connect } from 'react-redux'
import IdentifyPage from './IdentifyPage'
import { inputChangeWebcamIdentifyImage } from 'actions/webcam'
import { detectFace, setDetectedFaces, identifyFace, resetIdentifyFace, setIdentifiedResults } from 'actions/face'
import { setIdentifyGroup } from 'actions/group'
import { requestListPersons, setPersons } from 'actions/person'
import get from 'lodash.get'

const transformFacesToShapes = (facesArray, results, persons = []) => {
  return facesArray.map((face) => {
    const { faceId } = face
    const { left: x, top: y, width, height } = face.faceRectangle
    const result = results.find((result) => result.faceId === faceId)
    const personId = get(result, 'candidates[0].personId', '')
    const person = personId ? persons.find((person) => person.personId === personId) : {}
    const personName = person.name
    return {
      topLabel: 'faceId: ' + faceId.slice(0, 8) + '...',
      dimension: { x, y, width, height },
      bottomLabel: personName
    }
  })
}

const mapStateToProps = (state) => {
  const { persons } = state
  const { faces, results, groupId } = state.identify
  return {
    faceShapes: transformFacesToShapes(faces, results, persons[groupId]),
    faceIds: faces.map(face => face.faceId),
    results,
    faces,
    captureStatus: state.inputs.webcam_identify_image ? 'finish' : 'wait',
    detectStatus: faces.length > 0 ? 'finish' : 'wait',
    groupSelectStatus: groupId ? 'finish' : 'wait',
    identifyStatus: results.length > 0 ? 'finish' : 'wait',
    groups: state.personGroups
  }
}

const mapDispatchToProps = (dispatch) => ({
  onCaptureClick: (data) => {
    dispatch(inputChangeWebcamIdentifyImage(''))
    dispatch(resetIdentifyFace())
    dispatch(inputChangeWebcamIdentifyImage(data))
    dispatch(detectFace(data))
      .then((data) => dispatch(setDetectedFaces(data)))
  },
  dispatch
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { faceIds } = stateProps
  const { dispatch } = dispatchProps
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onGroupSelect: (e) => {
      const groupId = e.key
      dispatch(setIdentifyGroup(groupId))
      dispatch(requestListPersons(groupId))
        .then((persons) => dispatch(setPersons(groupId, persons)))
        .then(() => dispatch(identifyFace(faceIds, groupId)))
        .then((results) => dispatch(setIdentifiedResults(results)))
    }
  }
}

const IdentifyPageContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(IdentifyPage)

export default IdentifyPageContainer
