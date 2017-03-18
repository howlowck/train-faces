import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './GroupIndexPage.scss'
import { Button } from 'antd'

class GroupIndexPage extends Component {
  render () {
    const { className, group, onTrainGroupClick, onStatusRefreshClick, trainingStatus } = this.props

    return (
      <div className={classNames([styles.base, className])}>
        <p> This is your {group.name}</p>
        <br />
        <Button type='primary' onClick={onTrainGroupClick}>Train</Button>
        <Button onClick={onStatusRefreshClick}>Refresh</Button>
        <h3>Status</h3>
        {trainingStatus.status}
      </div>
    )
  }
}

GroupIndexPage.propTypes = {
  className: PropTypes.string,
  group: PropTypes.object,
  onTrainGroupClick: PropTypes.func,
  onStatusRefreshClick: PropTypes.func,
  trainingStatus: PropTypes.object
}

GroupIndexPage.defaultProps = {
  trainingStatus: { status: 'notstarted' }
}

export default GroupIndexPage
