import { connect } from 'react-redux'
import { requestListPersons, setPersons } from 'actions/person'
import GroupPage from './GroupPage'

const mapStateToProps = (state, ownProps) =>
({
  persons: state.persons[ownProps.params.groupId] ? state.persons[ownProps.params.groupId] : []
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => {
    dispatch(requestListPersons(ownProps.params.groupId))
      .then((personsList) => { dispatch(setPersons(ownProps.params.groupId, personsList)) })
  }
})
const GroupPageContainer = connect(mapStateToProps, mapDispatchToProps)(GroupPage)

export default GroupPageContainer
