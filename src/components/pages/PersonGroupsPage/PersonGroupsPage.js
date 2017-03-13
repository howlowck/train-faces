import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import { Link } from 'react-router'
import styles from './PersonGroupsPage.scss'

class PersonGroupsPage extends Component {
  render () {
    const { className, children, groups } = this.props

    return (
      <div className={classNames([styles.base, className])}>
        <ul className={styles.menu}>
          {groups.map((group) => (
            <Link to={`person-groups/${group.personGroupId}`} className={styles.menuItem} key={`${group.personGroupId}-link`}>{group.name}</Link>
          ))}
          <Link to={`person-groups/_create`} className={styles.createGroup}>Create a Person Group</Link>
        </ul>

        {children}
      </div>
    )
  }
}

PersonGroupsPage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  groups: PropTypes.array
}

export default PersonGroupsPage
