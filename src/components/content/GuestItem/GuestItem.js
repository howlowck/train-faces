import React, { PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './GuestItem.scss'

const GuestItem = ({ className, guest }) => (
  <div className={classNames([styles.base, className])}>
    <p>{guest.firstName}</p>
    <p>{guest.lastName}</p>
    <p>{guest.email}</p>
  </div>
)

GuestItem.propTypes = {
  className: PropTypes.string,
  guest: PropTypes.object
}

export default GuestItem
