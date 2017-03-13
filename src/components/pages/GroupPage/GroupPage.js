import React, { PropTypes, Component } from 'react'
import { classNames } from 'support/helpers'
import styles from './GroupPage.scss'
import { Menu, Icon, Button } from 'antd'
import { Link } from 'react-router'
const { Item } = Menu

class GroupPage extends Component {
  componentDidMount () {
    const { onMount, params } = this.props
    onMount(params.groupId)
  }

  render () {
    const { className, params, persons, children, onDeleteGroup } = this.props
    return (
      <div className={classNames([styles.base, className])}>
        <h3>Group Page - {params.groupId}</h3>
        <Button type='danger' onClick={onDeleteGroup}>Delete Group</Button>
        <div className={styles.persons}>
          <Menu mode='vertical' className={styles.menu}>
            <Item>
              <Link to={`person-groups/${params.groupId}/_create-person`}><Icon type='plus' />Create Person</Link>
            </Item>
            {persons.map((person) => (
              <Item key={`${person.personId}`}>
                <Link to={`person-groups/${params.groupId}/${person.personId}`}>{person.name}</Link>
              </Item>
          ))}

          </Menu>
          <div className={styles.person}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

GroupPage.propTypes = {
  className: PropTypes.string,
  params: PropTypes.object,
  persons: PropTypes.array,
  children: PropTypes.object,
  onMount: PropTypes.func,
  onDeleteGroup: PropTypes.func
}

export default GroupPage
