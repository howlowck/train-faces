import React, { PropTypes } from 'react'
import { classNames, byteCount, isJsonString, getShrug } from 'support/helpers'
import styles from './JsonInput.scss'
import JSONTree from 'react-json-tree'
import { Input } from 'antd'

const JsonInput = ({ className, onChange, content, label, maxBytes = 1000 }) => {
  const validJson = isJsonString(content)

  let jsonOutput
  let bytes
  let tooLong

  if (validJson) {
    const jsonObj = JSON.parse(content)
    jsonOutput = <JSONTree data={jsonObj} />
    bytes = byteCount(JSON.stringify(jsonObj))
    tooLong = bytes > maxBytes
  } else if (content === '') {
    jsonOutput = <div className={styles.empty}> Empty User Data </div>
    bytes = 0
    tooLong = false
  } else {
    jsonOutput = <div className={styles.invalid}> Input is not Valid JSON </div>
    bytes = getShrug()
    tooLong = false
  }

  return (
    <div className={classNames([styles.base, className])}>
      <label>{label}</label>
      <Input type='textarea' value={content} onChange={onChange} autosize={{ minRows: 2, maxRows: 6 }} />
      {jsonOutput}
      <div className={styles.size}>Limit: {bytes} / {maxBytes} Bytes</div>
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
