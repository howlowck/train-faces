/* global URL, requestAnimationFrame */

import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './WebcamInput.scss'
import { Button, Icon } from 'antd'

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

  startStream () {
    if (!this.stream) {
      navigator.getUserMedia({ video: true, audio: false }, this.onSuccessGetMedia.bind(this), () => {})
    }
  }
  endStream () {
    if (this.stream) {
      this.stream.getVideoTracks()[0].stop()
      delete this.stream
    }
  }

  // componentDidMount () {
  //   this.startStream()
  // }

  componentWillUnmount () {
    this.endStream()
  }

  render () {
    const { className, width, height, onCaptureClick, enabled, viewWidth, viewHeight } = this.props
    const onButtonClick = (event) => {
      event.preventDefault()
      onCaptureClick(this.getBase64())
    }
    if (!enabled) {
      this.endStream()
    } else {
      this.startStream()
    }

    return (
      <div
        style={{
          width: viewWidth
        }}
        className={classNames([styles.base, className])}>
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
          height={height}
          style={{
            width: viewWidth,
            height: viewHeight
          }}
          />
        <Button type='primary'
          className={styles.captureButton}
          onClick={onButtonClick}
          shape='circle'
          size='large'
          icon='camera-o' />
      </div>
    )
  }
}

WebcamInput.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewWidth: PropTypes.number,
  viewHeight: PropTypes.number,
  captureLabel: PropTypes.string,
  onCaptureClick: PropTypes.func,
  enabled: PropTypes.bool
}

WebcamInput.defaultProps = {
  width: 480,
  height: 360,
  captureLabel: 'Action',
  onCaptureClick: (data) => {},
  enabled: false,
  viewWidth: 480,
  viewHeight: 360
}

export default WebcamInput
