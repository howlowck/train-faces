import React, { Component, PropTypes } from 'react'
import { classNames, isJsonString, byteCount } from 'support/helpers'
import { Input, Button, Tooltip, Icon } from 'antd'
import styles from './CreatePersonPage.scss'
import JsonInput from 'components/forms/JsonInput'

class CreatePersonPage extends Component {
  render () {
    const { className, name = '', userData, onSubmit, onNameChange, onUserDataChange } = this.props
    const maxBytes = 16000
    let validRequest = (name !== '') && (isJsonString(userData) || userData === '') && (byteCount(userData) <= maxBytes)

    return (
      <div className={classNames([styles.base, className])}>
        <h4>Create a Person</h4>
        <form onSubmit={onSubmit}>
          <label htmlFor='person-name'>Name</label>
          <Input id='person-name' name='person-name' onChange={onNameChange} value={name} />
          <br />
          <br />
          <label>User Data (JSON) &nbsp;
            <Tooltip placement='right' title='You can attach any serializable JSON data to a Person entity. Max 16KB'>
              <Icon type='info-circle' />
            </Tooltip>
          </label>
          <JsonInput onChange={onUserDataChange} content={userData} maxBytes={maxBytes} />
          <Button htmlType='submit' type='primary' disabled={!validRequest}> Add a Person </Button>
        </form>
      </div>
    )
  }
}

CreatePersonPage.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  name: PropTypes.string,
  userData: PropTypes.string,
  onNameChange: PropTypes.func,
  onUserDataChange: PropTypes.func
}

export default CreatePersonPage
