import React from 'react'
import { Link, IndexLink } from 'react-router'
import { Menu, Layout } from 'antd'
const { Header } = Layout
import styles from './Header.scss'

export const MyHeader = () => (
  <Header>
    <span className={styles.title}>Training Phase</span>
    <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px', display: 'inline' }}
    >
      <Menu.Item key='1'><IndexLink to='/' activeClassName={styles.active}>Home</IndexLink></Menu.Item>
      <Menu.Item key='2'><Link to='person-groups' activeClassName={styles.active}>PersonGroup</Link></Menu.Item>
      <Menu.Item key='3'><Link to='config' activeClassName={styles.active}>Configure</Link></Menu.Item>
    </Menu>
  </Header>
  // <div className={styles.base}>
  //   <h1 className={styles.title}>Training</h1>
  //   <IndexLink to='/' activeClassName={styles.active}>
  //     Guest List
  //   </IndexLink>
  // </div>
)

export default MyHeader
