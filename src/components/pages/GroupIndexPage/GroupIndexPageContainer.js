import { connect } from 'react-redux'
import GroupIndexPage from './GroupIndexPage'

const mapStateToProps = (state, ownProps) => ({
  group: state.personGroups.find((group) => group.personGroupId === ownProps.params.groupId) || {}
})

const mapDispatchToProps = (dispatch) => ({

})

const GroupIndexPageContainer = connect(mapStateToProps, mapDispatchToProps)(GroupIndexPage)

export default GroupIndexPageContainer
