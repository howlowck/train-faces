import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './GroupIndexPage.scss'

class GroupIndexPage extends Component {
  render () {
    const { className, group } = this.props

    return (
      <div className={classNames([styles.base, className])}>
        <p> This is your {group.name}</p>

      </div>
    )
  }
}

GroupIndexPage.propTypes = {
  className: PropTypes.string,
  group: PropTypes.object
}

export default GroupIndexPage
