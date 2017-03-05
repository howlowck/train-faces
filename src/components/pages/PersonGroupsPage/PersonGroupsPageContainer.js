import { connect } from 'react-redux'
import PersonGroupsPage from './PersonGroupsPage'

const mapStateToProps = (state) => ({
  groups: state.personGroups
})

const mapDispatchToProps = (dispatch) => ({

})

const PersonGroupsPageContainer = connect(mapStateToProps, mapDispatchToProps)(PersonGroupsPage)

export default PersonGroupsPageContainer
