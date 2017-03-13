import React, { Component, PropTypes } from 'react'
import { classNames } from 'support/helpers'
import styles from './PersonGroupsIndexPage.scss'

class PersonGroupsIndexPage extends Component {
  getCta () {
    if (this.props.groups.length > 1) {
      return <p>Looks like you have some groups created already. Good job! You can select it with the menu above</p>
    }
    if (this.props.groups.length === 1) {
      return <p>You have a group already.  Please select it with the menu above!</p>
    }
    return <p> It looks like you don't have any Person Group created.
      Please click the "Create"" link and create a Person Group</p>
  }
  render () {
    const { className } = this.props

    return (
      <div className={classNames([styles.base, className])}>
        <h2>Person Groups</h2>
        <p>A Person Group is a logical grouping of the Person entity in the Face API.</p>
        <p>When you do an identify search on the Face API,
           you need to specify the Person Group that you want the API to search against</p>
        <br />
        {this.getCta()}
      </div>
    )
  }
}

PersonGroupsIndexPage.propTypes = {
  className: PropTypes.string,
  groups: PropTypes.array
}

export default PersonGroupsIndexPage
