import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './PersonPage.scss'
import JSONTree from 'react-json-tree'
import themes from 'constants/uiThemes'

class PersonPage extends Component {
  static propTypes = {
    className: PropTypes.string,
    person: PropTypes.object
  }

  render () {
    const { className, person } = this.props
    const { userData } = person
    const userDataEl = userData ? <JSONTree data={userData} theme={themes.jsonTreeTheme} /> : <p> Empty User Data</p>
    return (
      <div className={classNames([styles.base, className])}>
        <h4> {person.name} </h4>
        {userDataEl}
      </div>
    )
  }
}

export default PersonPage
