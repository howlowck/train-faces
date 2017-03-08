import React, { Component, PropTypes } from 'react'
import { classNames, isJsonString, byteCount } from 'support/helpers'
import { Input, Button } from 'antd'
import styles from './CreatePersonPage.scss'
import JsonInput from 'components/forms/JsonInput'

class CreatePersonPage extends Component {
  static propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    name: PropTypes.string,
    userData: PropTypes.string,
    onNameChange: PropTypes.func,
    onUserDataChange: PropTypes.func
  }

  render () {
    const { className, name = '', userData, onSubmit, onNameChange, onUserDataChange } = this.props
    const maxBytes = 1000
    let validRequest = (name !== '') && (isJsonString(userData) || userData === '') && (byteCount(userData) <= maxBytes)

    return (
      <div className={classNames([styles.base, className])}>
        <h4>Create a Person</h4>
        <form onSubmit={onSubmit}>
          <label htmlFor='person-name'>Name</label>
          <Input id='person-name' name='person-name' onChange={onNameChange} value={name} />
          <JsonInput onChange={onUserDataChange} label='User Data' content={userData} maxBytes={maxBytes} />
          <Button htmlType='submit' type='primary' disabled={!validRequest}> Add a Person </Button>
        </form>
      </div>
    )
  }
}

export default CreatePersonPage
