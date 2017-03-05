import React, { PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './GroupPage.scss'

const GroupPage = ({ className, params }) => (
  <div className={classNames([styles.base, className])}>
    <h3>Group Page - {params.name}</h3>
  </div>
)

GroupPage.propTypes = {
  className: PropTypes.string,
  params: PropTypes.object
}

export default GroupPage
