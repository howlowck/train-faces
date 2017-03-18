import { connect } from 'react-redux'
import GroupIndexPage from './GroupIndexPage'
import { trainGroup, getTrainingStatus, setTrainingStatus } from 'actions/group'

const mapStateToProps = (state, ownProps) => ({
  group: state.personGroups.find((group) => group.personGroupId === ownProps.params.groupId) || {},
  trainingStatus: state.trainingStatus[ownProps.params.groupId]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onTrainGroupClick: (event) => {
    event.preventDefault()
    const { groupId } = ownProps.params
    dispatch(trainGroup(groupId))
      .then(() => new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 200)
      }))
      .then(() => {
        return dispatch(getTrainingStatus(groupId))
      })
      .then((status) => {
        dispatch(setTrainingStatus(groupId, status))
      })
  },
  onStatusRefreshClick: () => {
    const { groupId } = ownProps.params
    dispatch(getTrainingStatus(groupId))
      .then((status) => {
        dispatch(setTrainingStatus(groupId, status))
      })
  }
})

const GroupIndexPageContainer = connect(mapStateToProps, mapDispatchToProps)(GroupIndexPage)

export default GroupIndexPageContainer
