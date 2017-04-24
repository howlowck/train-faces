import React, { Component, PropTypes } from 'react'
import pluralize from 'pluralize'
import { classNames } from 'support/helpers'
import styles from './PersonPage.scss'
import JSONTree from 'react-json-tree'
import themes from 'constants/uiThemes'
import OpenModal from 'components/core/OpenModal'
import NewFaceWebcamModal from 'components/content/NewFaceWebcamModal'
import NewFaceFileModal from 'components/content/NewFaceFileModal'
import { Button } from 'antd'

class PersonPage extends Component {
  render () {
    const { className, person,
      onCaptureWebcamClick, capturedImage,
      onModalClose, onDeletePerson,
      newFaceUserData, onChangeUserData,
      onCreateFaceSubmit, onFileChange
    } = this.props

    const { userData } = person
    const faceCount = person.persistedFaceIds.length
    const userDataEl = userData ? <JSONTree data={userData} theme={themes.jsonTreeTheme} /> : <p> Empty User Data</p>
    return (
      <div className={classNames([styles.base, className])}>
        <h4>Name: {person.name} </h4>
        <Button onClick={onDeletePerson} type='danger'>Delete Person</Button>
        <p> User Data: </p>
        {userDataEl}
        <h5>Faces</h5>
        <OpenModal name='newFaceWebcamModal' buttonText='Add with Webcam' onModalClose={onModalClose}>
          <NewFaceWebcamModal
            onCaptureClick={onCaptureWebcamClick}
            capturedImage={capturedImage}
            userData={newFaceUserData}
            onChangeUserData={onChangeUserData}
            onSubmit={onCreateFaceSubmit} />
        </OpenModal>
        <OpenModal name='newFaceFileModal' buttonText='Add with File' onModalClose={onModalClose}>
          <NewFaceFileModal
            onImageLoad={onFileChange}
            onChangeUserData={onChangeUserData}
            capturedImage={capturedImage}
            onSubmit={onCreateFaceSubmit}
            userData={newFaceUserData}
          />
        </OpenModal>

        <p>You have {faceCount} {pluralize('face', faceCount)} registered for this person</p>
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
  onDeletePerson: PropTypes.func,
  newFaceUserData: PropTypes.string,
  onChangeUserData: PropTypes.func,
  onCreateFaceSubmit: PropTypes.func,
  onFileChange: PropTypes.func
}
export default PersonPage
