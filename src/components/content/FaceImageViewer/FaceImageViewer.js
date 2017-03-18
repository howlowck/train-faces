import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import InputImageViewer from 'components/content/InputImageViewer'
import styles from './FaceImageViewer.scss'

class FaceImageViewer extends Component {
  constructor () {
    super()
    this.renderCanvas = this.renderCanvas.bind(this)
  }
  componentDidMount () {
    this.ctx = this.canvas.getContext('2d')
  }
  renderCanvas (event) {
    this.ctx.drawImage(event.target, 0, 0)
  }
  drawRects (ctx) {
    const { shapes = [] } = this.props
    shapes.forEach(({ topLabel = '', bottomLabel = '', color = 'green', dimension }) => {
      const { x, y, width, height } = dimension
      ctx.strokeStyle = color
      ctx.font = '13px san-serif'
      ctx.strokeText(topLabel, x, y - 3)
      ctx.strokeRect(x, y, width, height)
      if (bottomLabel) {
        ctx.fillStyle = color
        ctx.fillRect(x, y + height, width, 10)
        ctx.strokeStyle = 'white'
        ctx.strokeText(bottomLabel, x + 10, y + height + 10)
      }
    })
  }
  render () {
    const { className, inputImageName } = this.props
    if (this.ctx) {
      this.drawRects(this.ctx)
    }
    return (
      <div className={classNames([styles.base, className])}>
        <InputImageViewer name={inputImageName}
          ref={el => { this.img = el }}
          onLoad={this.renderCanvas}
          className={styles.image}
        />
        <canvas width='480' height='360' ref={el => { this.canvas = el }} />
      </div>
    )
  }
}

FaceImageViewer.propTypes = {
  className: PropTypes.string,
  inputImageName: PropTypes.string,
  shapes: PropTypes.array // {topLabel, bottomLabel, color, dimension: {x, y, width, height}}
}

export default FaceImageViewer
