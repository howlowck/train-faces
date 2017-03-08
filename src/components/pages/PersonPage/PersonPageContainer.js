import { connect } from 'react-redux'
import PersonPage from './PersonPage'

const mapStateToProps = (state, { params }) => ({
  person: state.persons[params.groupId].find((person) => person.personId === params.personId)
})

const mapDispatchToProps = (dispatch) => ({

})

const PersonPageContainer = connect(mapStateToProps, mapDispatchToProps)(PersonPage)

export default PersonPageContainer
