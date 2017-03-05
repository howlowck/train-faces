import { connect } from 'react-redux'
import ConfigForm from './ConfigForm'
import { setConfig } from 'actions/config'

const mapStateToProps = (state) => ({
  configValues: state.config
})

const mapDispatchToProps = (dispatch) => ({
  onValueChange: (event) => {
    const payload = {
      key: event.target.name,
      value: event.target.value
    }
    dispatch(setConfig(payload))
  }
})

const ConfigFormContainer = connect(mapStateToProps, mapDispatchToProps)(ConfigForm)
export default ConfigFormContainer
