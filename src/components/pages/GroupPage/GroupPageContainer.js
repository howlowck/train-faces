import { connect } from 'react-redux'
import { requestListPersons, setPersons } from 'actions/person'
import { deleteGroup } from 'actions/group'
import GroupPage from './GroupPage'

const mapStateToProps = (state, ownProps) =>
({
  persons: state.persons[ownProps.params.groupId] || []
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => {
    dispatch(requestListPersons(ownProps.params.groupId))
      .then((personsList) => { dispatch(setPersons(ownProps.params.groupId, personsList)) })
  },
  onDeleteGroup: () => {
    const { groupId } = ownProps.params
    const { router } = ownProps
    dispatch(deleteGroup(groupId))
    router.push('person-groups')
  }
})

const GroupPageContainer = connect(mapStateToProps, mapDispatchToProps)(GroupPage)

export default GroupPageContainer
