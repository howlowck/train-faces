import React, { Component, PropTypes } from 'react'
import styles from './NewFaceWebcamModal.scss'
import { Modal } from 'antd'
import WebcamInput from 'components/forms/WebcamInput'

class NewFaceWebcamModal extends Component {
  render () {
    const { onCaptureClick, visible, capturedImage, onCancel, onOk } = this.props
    return (
      <Modal
        title='Add with Webcam'
        afterClose={this.afterModalClose}
        visible={visible}
        className={styles.base}
        onCancel={onCancel}
        onOk={onOk}
        footer={null}
        >
        <div className={styles.webcam}>
          <WebcamInput captureLabel='Capture' onCaptureClick={onCaptureClick} enabled={visible} viewWidth={240} viewHeight={180} />
        </div>
        <div className={styles.captured}>
          <h2>Captured Image</h2>
          <img src={capturedImage} alt='captured image' />
        </div>
      </Modal>
    )
  }
}

NewFaceWebcamModal.propTypes = {
  className: PropTypes.string,
  onCaptureClick: PropTypes.func,
  visible: PropTypes.bool,
  capturedImage: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func
}

export default NewFaceWebcamModal
