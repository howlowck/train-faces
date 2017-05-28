import React, { PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './ConfigForm.scss'
import configKeys from 'constants/configKeys'
import { Input } from 'antd'

const ConfigForm = ({ className, onValueChange, configValues }) => {
  return (
    <div className={classNames([styles.base, className])}>
      {configKeys.map((key) => {
        const configValue = configValues.hasOwnProperty(key) && (configValues[key] !== null) ? configValues[key] : ''
        const type = (key.slice(-3) === 'Key') ? 'password' : 'text'
        return (
          <div key={key} className={styles.field}>
            <label htmlFor={key}>{key}:</label>            &nbsp;&nbsp;
            <Input name={key} id={key} value={configValue} onChange={onValueChange} type={type} />
          </div>)
      })}
    </div>
  )
}

ConfigForm.propTypes = {
  className: PropTypes.string,
  onValueChange: PropTypes.func,
  configValues: PropTypes.object
}

export default ConfigForm
