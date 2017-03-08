import { connect } from 'react-redux'
import PersonPage from './PersonPage'
import { uploadBase64Face } from 'actions/face'

const mapStateToProps = (state, { params }) => ({
  person: state.persons[params.groupId].find((person) => person.personId === params.personId)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAddWithWebcamClick: (data) => {
    const { groupId, personId } = ownProps.params
    dispatch(uploadBase64Face(groupId, personId, data))
  }
})

const PersonPageContainer = connect(mapStateToProps, mapDispatchToProps)(PersonPage)

export default PersonPageContainer
