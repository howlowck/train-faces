import React, { PropTypes } from 'react'
import { classNames, byteCount, isJsonString, getShrug } from 'support/helpers'
import styles from './JsonInput.scss'
import JSONTree from 'react-json-tree'
import themes from 'constants/uiThemes'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/github'

const getJsonTreeEl = (showTree, validJson, content) => {
  if (!showTree) return ''
  if (content === '') return <div className={styles.empty}> Empty User Data </div>
  if (!validJson) return <div className={styles.invalid}> Input is not Valid JSON </div>
  const { jsonTreeTheme } = themes
  const jsonObj = JSON.parse(content)
  return <JSONTree data={jsonObj} theme={jsonTreeTheme} />
}

const getLimitEl = (showLimit, validJson, content, limit) => {
  if (!showLimit) return ''
  if (content === '') return <p>Limit: 0/{limit} Bytes</p>
  if (!validJson) return <p>Limit: {getShrug()}</p>
  const bytes = byteCount(JSON.stringify(JSON.parse(content)))
  const tooLongClassName = bytes > limit ? styles.invalid : ''
  return <p className={classNames([styles.limit, tooLongClassName])}>Limit: {bytes}/{limit} Bytes</p>
}

const JsonInput = ({
  className, onChange, content,
  label, maxBytes = 1000, showByteLimit,
  showJsonTree, width, height }) => {
  const validJson = isJsonString(content)

  return (
    <div className={classNames([styles.base, className])}>
      <AceEditor
        mode='json'
        theme='github'
        value={content}
        onChange={onChange}
        tabSize={2}
        style={{ border: '1px solid #d9d9d9', borderRadius: 4 }}
        height={`${height}px`}
        width={`${width}px`}
        showGutter={false} />
      {getJsonTreeEl(showJsonTree, validJson, content)}
      {getLimitEl(showByteLimit, validJson, content, maxBytes)}
    </div>
  )
}

JsonInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  content: PropTypes.string,
  label: PropTypes.string,
  maxBytes: PropTypes.number,
  showJsonTree: PropTypes.bool,
  showByteLimit: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number
}

JsonInput.defaultProps = {
  showJsonTree: true,
  showByteLimit: true,
  width: 500,
  height: 500
}

export default JsonInput
