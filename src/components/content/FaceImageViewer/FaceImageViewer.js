import React, { Component, PropTypes } from 'react'
import { classNames, getScaleImageFit } from 'support/helpers'
import InputImageViewer from 'components/content/InputImageViewer'
import styles from './FaceImageViewer.scss'

class FaceImageViewer extends Component {
  constructor () {
    super()
    this.renderCanvas = this.renderCanvas.bind(this)
    this.imageScale = 1
  }
  componentDidMount () {
    this.ctx = this.canvas.getContext('2d')
  }
  renderCanvas (event) {
    this.ctx.clearRect(0, 0, this.props.width, this.props.height)
    this.scale = getScaleImageFit({ imageWidth: event.target.width, imageHeight: event.target.height },
    { constraintWidth: this.props.width, constraintHeight: this.props.height })
    this.ctx.drawImage(event.target, 0, 0, event.target.width * this.scale, event.target.height * this.scale)
  }
  drawRects (ctx) {
    const { shapes = [] } = this.props
    shapes.forEach(({ topLabel = '', bottomLabel = '', color = 'green', dimension }) => {
      const { x: orgX, y: orgY, width: orgWidth, height: orgHeight } = dimension
      const x = orgX * this.scale
      const y = orgY * this.scale
      const width = orgWidth * this.scale
      const height = orgHeight * this.scale

      ctx.strokeStyle = color
      ctx.font = '13px san-serif'
      ctx.strokeText(topLabel, x, y - 3)
      ctx.strokeRect(x, y, width, height)
      if (bottomLabel) {
        ctx.fillStyle = color
        ctx.fillRect(x, y + height, width, 18)
        ctx.strokeStyle = 'white'
        ctx.strokeText(bottomLabel, x + 10, y + height + 13)
      }
    })
  }
  render () {
    const { className, inputImageName, width, height } = this.props
    if (this.ctx) {
      this.drawRects(this.ctx)
    }
    return (
      <div className={classNames([styles.base, className])}>
        <InputImageViewer name={inputImageName}
          // ref={el => { this.img = el }}
          onLoad={this.renderCanvas}
          className={styles.image} // TODO add
        />
        <canvas width={width} height={height} ref={el => { this.canvas = el }} />
      </div>
    )
  }
}

FaceImageViewer.propTypes = {
  className: PropTypes.string,
  inputImageName: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  shapes: PropTypes.array // {topLabel, bottomLabel, color, dimension: {x, y, width, height}}
}

FaceImageViewer.defaultProps = {
  width: 480,
  height: 360
}

export default FaceImageViewer
