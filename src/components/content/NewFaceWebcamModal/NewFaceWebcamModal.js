import React, { Component, PropTypes } from 'react'
import styles from './NewFaceWebcamModal.scss'
import { Modal, Button, Icon, Tooltip } from 'antd'
import WebcamInput from 'components/forms/WebcamInput'
import JsonInput from 'components/forms/JsonInput'
import { isJsonString } from 'support/helpers'

const getSubmitButtonEl = (capturedImage, userData, onSubmit) => {
  const validJson = userData === '' || isJsonString(userData)
  if (capturedImage && validJson) return <Button type='primary' onClick={onSubmit}>Add Face</Button>
  return <Button onClick={onSubmit} disabled type='primary'>Invalid Request</Button>
}

class NewFaceWebcamModal extends Component {
  render () {
    const { onCaptureClick, visible, capturedImage, onCancel, onOk, onSubmit, onChangeUserData, userData } = this.props
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
        <div className={styles.inputs}>
          <div className={styles.webcam}>
            <label>Camera</label>
            <WebcamInput
              onCaptureClick={onCaptureClick}
              enabled={visible}
              viewWidth={240}
              viewHeight={180}
            />
          </div>
          <div className={styles.userData}>
            <label>User Data <Tooltip placement='right' title='Max 1KB'><Icon type='info-circle' /></Tooltip></label>
            <JsonInput width={235} height={160} showJsonTree={false} onChange={onChangeUserData} content={userData} />
          </div>
        </div>
        <div className={styles.captured}>
          <label>Captured Image</label>
          <img src={capturedImage} alt='captured image' />
        </div>
        {getSubmitButtonEl(capturedImage, userData, onSubmit)}
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
  onOk: PropTypes.func,
  onSubmit: PropTypes.func,
  onChangeUserData: PropTypes.func,
  userData: PropTypes.string
}

export default NewFaceWebcamModal
