import { connect } from 'react-redux'
import {
  createPerson,
  inputChangeNewPersonName,
  inputChangeNewPersonUserData,
  requestListPersons,
  setPersons
} from 'actions/person'
import CreatePersonPage from './CreatePersonPage'

const mapStateToProps = (state, ownProps) => {
  const { groupId } = ownProps.params
  const { new_person_name: newPersonName = {}, new_person_user_data: newPersonUserData = {} } = state.inputs

  return {
    name: newPersonName[groupId] ? newPersonName[groupId].value : '',
    userData: newPersonUserData[groupId] ? newPersonUserData[groupId].value : ''
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { groupId } = ownProps.params
  return {
    onNameChange: (event) => {
      dispatch(inputChangeNewPersonName(groupId, event.target.value))
    },

    onUserDataChange: (value) => {
      dispatch(inputChangeNewPersonUserData(groupId, value))
    },
    dispatch
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { name, userData } = stateProps
  const { dispatch } = dispatchProps
  const { router } = ownProps
  const { groupId } = ownProps.params

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onSubmit: (event) => {
      event.preventDefault()
      const processedUserData = userData === '' ? userData : JSON.parse(userData)
      let newPersonId
      dispatch(createPerson(groupId, name, processedUserData))
      .then((personId) => {
        newPersonId = personId
        return dispatch(requestListPersons(groupId))
      }).then((personsList) => {
        dispatch(setPersons(groupId, personsList))
      }).then(() => {
        // TODO: redirect to the newly created Person
        router.push(`/person-groups/${groupId}/${newPersonId}`)
        dispatch(inputChangeNewPersonName(groupId, ''))
        dispatch(inputChangeNewPersonUserData(groupId, ''))
      })
    }
  }
}

const CreatePersonPageContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreatePersonPage)

export default CreatePersonPageContainer
