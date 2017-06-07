/* global FileReader */
import React, { PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './SingleFileInput.scss'

const handleChange = (onImageSet) => (event) => {
  event.preventDefault()

  let reader = new FileReader()
  let file = event.target.files[0]

  reader.onloadend = () => {
    onImageSet(reader.result)
      // this.setState({
      //   file: file,
      //   imagePreviewUrl: reader.result
      // })
  }

  reader.readAsDataURL(file)
}

const SingleFileInput = ({ className, onImageSet }) => (
  <div className={classNames([styles.base, className])}>
    <input type='file' onChange={handleChange(onImageSet)} />
  </div>
)

SingleFileInput.propTypes = {
  className: PropTypes.string,
  onImageSet: PropTypes.func
}

export default SingleFileInput
