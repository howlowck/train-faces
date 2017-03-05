import React, { PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './ConfigPage.scss'
import ConfigForm from 'components/forms/ConfigForm'

const ConfigPage = ({ className }) => (
  <div className={classNames([styles.base, className])}>
    <ConfigForm />
  </div>
)

ConfigPage.propTypes = {
  className: PropTypes.string
}

export default ConfigPage
