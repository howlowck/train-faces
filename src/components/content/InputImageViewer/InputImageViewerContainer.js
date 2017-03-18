import { connect } from 'react-redux'
import InputImageViewer from './InputImageViewer'

const mapStateToProps = (state, ownProps) => ({
  imageBase64: state.inputs[ownProps.name] ? state.inputs[ownProps.name].value : ''
})

const mapDispatchToProps = (dispatch) => ({

})

const InputImageViewerContainer = connect(mapStateToProps, mapDispatchToProps)(InputImageViewer)

export default InputImageViewerContainer
