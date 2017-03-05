import React, { PropTypes } from 'react'
import styles from './HomePage.scss'
import { Menu } from 'antd'
const { Item } = Menu

export const HomePage = ({ guests }) => (
  <div className={styles.base}>
    <h4>Welcome!!!</h4>
    <Menu style={{ width: 240 }}>
      {guests.map((guest) => (
        <Item key={guest.id}>{guest.firstName} {guest.lastName}</Item>
      ))}
    </Menu>
  </div>
)

HomePage.propTypes = {
  guests: PropTypes.array
}

export default HomePage
