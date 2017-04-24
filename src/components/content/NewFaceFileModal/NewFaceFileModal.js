/* global FileReader */
import React, { PropTypes } from 'react'
import { classNames, isJsonString } from 'support/helpers'
import JsonInput from 'components/forms/JsonInput'
import { Modal, Button, Tooltip, Icon } from 'antd'
import styles from './NewFaceFileModal.scss'

const getSubmitButtonEl = (capturedImage, userData, onSubmit) => {
  const validJson = userData === '' || isJsonString(userData)
  if (capturedImage && validJson) return <Button type='primary' onClick={onSubmit}>Add Face</Button>
  return <Button onClick={onSubmit} disabled type='primary'>Invalid Request</Button>
}

const NewFaceFileModal = (
  {
    className, visible, // state
    onCancel, onOk, onImageLoad, onChangeUserData, onSubmit,
    afterModalClose, // event listener
    capturedImage, userData // content
  }) => {
  const handleChange = (event) => {
    event.preventDefault()

    let reader = new FileReader()
    let file = event.target.files[0]

    reader.onloadend = () => {
      onImageLoad(reader.result)
      // this.setState({
      //   file: file,
      //   imagePreviewUrl: reader.result
      // })
    }

    reader.readAsDataURL(file)
  }

  return (
    <Modal
      className={classNames([styles.base, className])}
      title='Add with Webcam'
      afterClose={afterModalClose}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      footer={null}
    >
      <input type='file' onChange={handleChange} />
      <div className={styles.userData}>
        <label>User Data <Tooltip placement='right' title='Max 1KB'><Icon type='info-circle' /></Tooltip></label>
        <JsonInput width={235} height={160} showJsonTree={false} onChange={onChangeUserData} content={userData} />
      </div>
      <div className={styles.captured} style={{ 'max-width': 500 }}>
        <label>Captured Image</label>
        <img style={{ width: '100%' }} src={capturedImage} alt='captured image' />
      </div>
      {getSubmitButtonEl(capturedImage, userData, onSubmit)}
    </Modal>
  )
}

NewFaceFileModal.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  onImageLoad: PropTypes.func,
  capturedImage: PropTypes.string,
  onChangeUserData: PropTypes.func,
  onSubmit: PropTypes.func,
  userData: PropTypes.string,
  afterModalClose: PropTypes.func
}

export default NewFaceFileModal
