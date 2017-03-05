import { connect } from 'react-redux'
import HomePage from './HomePage'

const mapStateToProps = (state) => ({
  guests: state.guests
})

const HomeContainer = connect(mapStateToProps)(HomePage)
export default HomeContainer
