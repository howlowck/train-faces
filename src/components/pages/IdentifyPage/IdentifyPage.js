import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import { Steps, Icon, Dropdown, Menu, Button, Switch } from 'antd'
import SingleFileInput from 'components/forms/SingleFileInput'
import styles from './IdentifyPage.scss'
import WebcamInput from 'components/forms/WebcamInput'
import FaceImageViewer from 'components/content/FaceImageViewer'
import JSONTree from 'react-json-tree'
import themes from 'constants/uiThemes'
import 'brace/mode/json'
import 'brace/theme/github'

const { Step } = Steps
const { jsonTreeTheme } = themes
class IdentifyPage extends Component {
  getMenu (handleMenuClick) {
    const { groups } = this.props
    const { Item } = Menu
    return (
      <Menu onClick={handleMenuClick}>
        {groups.map((group) => (
          <Item key={group.personGroupId}>{group.name}</Item>
        ))}
      </Menu>
    )
  }
  getInputEl (inputMethod, onCaptureClick) {
    if (inputMethod === 'webcam') {
      return (
        <WebcamInput enabled
          onCaptureClick={onCaptureClick}
        />
      )
    }

    return <SingleFileInput onImageSet={onCaptureClick} />
  }

  render () {
    const {
      className, onCaptureClick, faceShapes,
      captureStatus, detectStatus, groupSelectStatus,
      identifyStatus, onGroupSelect, faces, results, onImageInputToggleChange, inputMethod
    } = this.props

    return (
      <div className={classNames([styles.base, className])}>
        <h2>Test Trained Faces</h2>
        <p>To identify a face, you will first need "detect" a face,
          then "identify" the faces with the faceIds returned back from the detect route</p>
        <Steps>
          <Step status={captureStatus} title='Take or Upload a Photo' icon={<Icon type='camera' />} />
          <Step status={detectStatus} title='Detect Face' icon={<Icon type='scan' />} />
          <Step status={groupSelectStatus} title='Select Group' icon={<Icon type='team' />} />
          <Step status={identifyStatus} title='Identify' icon={<Icon type='smile-o' />} />
        </Steps>
        <div className={styles.inputToggle}>
          <span className={styles.input}> Webcam </span>
          <Switch id='image-toggle' defaultChecked={false} onChange={onImageInputToggleChange} />
          <span className={styles.input}> File Upload </span>
        </div>
        {this.getInputEl(inputMethod, onCaptureClick)}
        <br />
        <FaceImageViewer inputImageName='webcam_identify_image' altText='Captured Data' shapes={faceShapes} />
        <h3>Detect Results:</h3>
        <JSONTree data={faces} theme={jsonTreeTheme} />
        <h3>Pick a Person Group</h3>
        <Dropdown overlay={this.getMenu(onGroupSelect)}>
          <Button>Select a Group</Button>
        </Dropdown>
        <h3>Identify Results</h3>
        <JSONTree data={results} theme={jsonTreeTheme} />
      </div>
    )
  }
}

IdentifyPage.propTypes = {
  className: PropTypes.string,
  onCaptureClick: PropTypes.func,
  faceShapes: PropTypes.array,
  groups: PropTypes.array,
  captureStatus: PropTypes.oneOf(['wait', 'process', 'finish']),
  detectStatus: PropTypes.oneOf(['wait', 'process', 'finish']),
  groupSelectStatus: PropTypes.oneOf(['wait', 'process', 'finish']),
  identifyStatus: PropTypes.oneOf(['wait', 'process', 'finish']),
  onGroupSelect: PropTypes.func,
  onImageInputToggleChange: PropTypes.func,
  faces: PropTypes.array,
  results: PropTypes.array,
  inputMethod: PropTypes.oneOf(['upload', 'webcam'])
}

IdentifyPage.defaultProps = {
  captureStatus: 'wait',
  detectStatus: 'wait',
  groupSelectStatus: 'wait',
  identifyStatus: 'wait',
  faces: [],
  results: [],
  inputMethod: 'webcam'
}

export default IdentifyPage
