import React, { PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './InputImageViewer.scss'

const InputImageViewer = ({ className, imageBase64: data, altText, onLoad }) => (
  <img src={data} className={classNames([styles.base, className])} alt={altText} onLoad={onLoad} />
)

InputImageViewer.propTypes = {
  className: PropTypes.string,
  imageBase64: PropTypes.string,
  altText: PropTypes.string,
  onLoad: PropTypes.func
}

InputImageViewer.defaultProps = {
  onLoad: () => {}
}

export default InputImageViewer
