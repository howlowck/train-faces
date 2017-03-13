import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './PersonPage.scss'
import JSONTree from 'react-json-tree'
import themes from 'constants/uiThemes'
import OpenModal from 'components/core/OpenModal'
import NewFaceWebcamModal from 'components/content/NewFaceWebcamModal'
import { Button } from 'antd'

class PersonPage extends Component {
  render () {
    const { className, person, onCaptureWebcamClick, capturedImage, onModalClose, onDeletePerson } = this.props
    const { userData } = person
    const userDataEl = userData ? <JSONTree data={userData} theme={themes.jsonTreeTheme} /> : <p> Empty User Data</p>
    return (
      <div className={classNames([styles.base, className])}>
        <h4>Name: {person.name} </h4>
        <Button onClick={onDeletePerson} type='danger'>Delete Person</Button>
        <p> User Data: </p>
        {userDataEl}
        <h5>Faces</h5>
        <OpenModal name='newFaceWebcamModal' buttonText='Add with Webcam' onModalClose={onModalClose}>
          <NewFaceWebcamModal onCaptureClick={onCaptureWebcamClick} capturedImage={capturedImage} />
        </OpenModal>
      </div>
    )
  }
}

PersonPage.propTypes = {
  className: PropTypes.string,
  person: PropTypes.object,
  onCaptureWebcamClick: PropTypes.func,
  capturedImage: PropTypes.string,
  onModalClose: PropTypes.func,
  onDeletePerson: PropTypes.func
}
export default PersonPage
