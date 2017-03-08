/* global URL, requestAnimationFrame */

import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './WebcamInput.scss'
import { Button } from 'antd'

class WebcamInput extends Component {
  onSuccessGetMedia (stream) {
    this.stream = stream
    const { videoEl, canvasEl } = this
    const { width, height } = this.props
    const videoSourceUrl = URL.createObjectURL(stream)
    videoEl.src = videoSourceUrl
    const canvasContext = canvasEl.getContext('2d')
    const renderFeedCanvas = () => {
      canvasContext.drawImage(videoEl, 0, 0, width, height)
      requestAnimationFrame(renderFeedCanvas)
    }
    requestAnimationFrame(renderFeedCanvas)
  }

  getBase64 () {
    return this.canvasEl.toDataURL('image/png')
  }

  componentDidMount () {
    navigator.getUserMedia({ video: true, audio: false }, this.onSuccessGetMedia.bind(this), () => {})
  }

  componentWillUnmount () {
    if (this.stream) {
      this.stream.getTracks().forEach(function (track) {
        track.stop()
      })
    }
  }

  render () {
    const { className, width, height, actionLabel, onActionClick } = this.props
    const onButtonClick = (event) => {
      event.preventDefault()
      onActionClick(this.getBase64())
    }

    return (
      <div className={classNames([styles.base, className])}>
        <video
          className={styles.video}
          ref={(video) => { this.videoEl = video }}
          width={width}
          height={height}
          autoPlay
        />
        <canvas
          className={styles.canvas}
          ref={(canvas) => { this.canvasEl = canvas }}
          width={width}
          height={height} />
        <Button type='primary' onClick={onButtonClick}>{actionLabel}</Button>
      </div>
    )
  }
}

WebcamInput.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  actionLabel: PropTypes.string,
  onActionClick: PropTypes.func
}

WebcamInput.defaultProps = {
  width: 480,
  height: 360,
  actionLabel: 'Action',
  onActionClick: (data) => {}
}

export default WebcamInput
