import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import { Link } from 'react-router'
import styles from './PersonGroupsPage.scss'

class PersonGroupsPage extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    groups: PropTypes.array
  }

  render () {
    const { className, children, groups } = this.props

    return (
      <div className={classNames([styles.base, className])}>
        {groups.map((group) => (
          <Link to={`person-groups/${group.personGroupId}`} key={`${group.personGroupId}-link`}>{group.name}</Link>
        ))}
        <Link to={`person-groups/_create`}>New</Link>
        {children}
      </div>
    )
  }
}

export default PersonGroupsPage
