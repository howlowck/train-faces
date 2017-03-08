import React, { Component, PropTypes, cloneElement } from 'react'
import styles from './OpenModal.scss'
import { classNames } from 'support/helpers'
import { Button } from 'antd'

class OpenModal extends Component {
  render () {
    const { className, children, buttonText, openFunc, size, modalVisible, closeModal } = this.props

    return (
      <div className={classNames([styles.base, className])}>
        <Button className={styles[size]} type='primary' onClick={openFunc}>{buttonText}</Button>
        {cloneElement(children, { visible: modalVisible, onCancel: closeModal, onOk: closeModal })}
      </div>
    )
  }
}

OpenModal.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  openFunc: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  uid: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']).isRequired
}

OpenModal.defaultProps = {
  buttonText: 'Open Modal',
  size: 'medium'
}

export default OpenModal
