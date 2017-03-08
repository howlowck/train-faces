import { connect } from 'react-redux'
import { inputChangeNewGroupName, createPersonGroup } from 'actions/group'
import CreateGroupPage from './CreateGroupPage'

const mapStateToProps = (state) => ({
  groupName: state.inputs.new_group_name ? state.inputs.new_group_name.value : ''
})

const mapDispatchToProps = (dispatch, ownProp) => ({
  onNameValueChange: (event) => {
    dispatch(inputChangeNewGroupName(event.target.value))
  },
  onSubmit: (event) => {
    event.preventDefault()
    const name = event.target.querySelector('#group-name').value
    dispatch(createPersonGroup(name))
  }
})

const CreateGroupPageContainer = connect(mapStateToProps, mapDispatchToProps)(CreateGroupPage)

export default CreateGroupPageContainer
