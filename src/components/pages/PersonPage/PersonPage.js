import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './PersonPage.scss'
import JSONTree from 'react-json-tree'
import themes from 'constants/uiThemes'
import OpenModal from 'components/core/OpenModal'
import WebcamInput from 'components/forms/WebcamInput'
import { Modal } from 'antd'

class PersonPage extends Component {
  render () {
    const { className, person, onAddWithWebcamClick } = this.props
    const { userData } = person
    const userDataEl = userData ? <JSONTree data={userData} theme={themes.jsonTreeTheme} /> : <p> Empty User Data</p>
    return (
      <div className={classNames([styles.base, className])}>
        <h4>Name: {person.name} </h4>
        <p> User Data: </p>
        {userDataEl}
        <h5>Faces</h5>
        <OpenModal buttonText='Add with Webcam'>
          <Modal title='Add with Webcam'>
            <WebcamInput actionLabel='Add Face' onActionClick={onAddWithWebcamClick} />
          </Modal>
        </OpenModal>
      </div>
    )
  }
}

PersonPage.propTypes = {
  className: PropTypes.string,
  person: PropTypes.object,
  onAddWithWebcamClick: PropTypes.func
}

export default PersonPage
