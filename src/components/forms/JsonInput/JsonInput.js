import React, { PropTypes } from 'react'
import { classNames, byteCount, isJsonString, getShrug } from 'support/helpers'
import styles from './JsonInput.scss'
import JSONTree from 'react-json-tree'
import { Input } from 'antd'
import themes from 'constants/uiThemes'

const JsonInput = ({ className, onChange, content, label, maxBytes = 1000 }) => {
  const validJson = isJsonString(content)

  let jsonOutput
  let bytes
  let tooLongClassName = ''
  const { jsonTreeTheme } = themes

  if (validJson) {
    const jsonObj = JSON.parse(content)
    jsonOutput = <JSONTree data={jsonObj} theme={jsonTreeTheme} />
    bytes = byteCount(JSON.stringify(jsonObj))
    tooLongClassName = bytes > maxBytes ? styles.invalid : ''
  } else if (content === '') {
    jsonOutput = <div className={styles.empty}> Empty User Data </div>
    bytes = 0
  } else {
    jsonOutput = <div className={styles.invalid}> Input is not Valid JSON </div>
    bytes = getShrug()
  }

  return (
    <div className={classNames([styles.base, className])}>
      <label>{label} (in JSON Format)</label>
      <Input type='textarea' value={content} onChange={onChange} autosize={{ minRows: 2, maxRows: 6 }} />
      {jsonOutput}
      <div className={classNames([styles.size, tooLongClassName])}>Limit: {bytes} / {maxBytes} Bytes</div>
    </div>
  )
}

JsonInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  content: PropTypes.string,
  label: PropTypes.string,
  maxBytes: PropTypes.number
}

export default JsonInput
