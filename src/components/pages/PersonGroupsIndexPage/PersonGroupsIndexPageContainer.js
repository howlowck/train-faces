import { connect } from 'react-redux'
import PersonGroupsIndexPage from './PersonGroupsIndexPage'

const mapStateToProps = (state) => ({
  groups: state.personGroups
})

const mapDispatchToProps = (dispatch) => ({

})

const PersonGroupsIndexPageContainer = connect(mapStateToProps, mapDispatchToProps)(PersonGroupsIndexPage)

export default PersonGroupsIndexPageContainer
