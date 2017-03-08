import React, { PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './CreateGroupPage.scss'

const CreateGroupPage = ({ className, onNameValueChange, groupName, onSubmit }) => (
  <div className={classNames([styles.base, className])}>
    <h3>Create Person Group</h3>
    <form onSubmit={onSubmit}>
      <input id='group-name' name='group-name' onChange={onNameValueChange} value={groupName} />
      <button>Create!</button>
    </form>
  </div>
)

CreateGroupPage.propTypes = {
  className: PropTypes.string,
  onNameValueChange: PropTypes.func,
  groupName: PropTypes.string,
  onSubmit: PropTypes.func
}

export default CreateGroupPage
