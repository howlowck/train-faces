import React from 'react'
import { Link, IndexLink } from 'react-router'
import { Menu, Layout } from 'antd'
import styles from './Header.scss'
const { Header } = Layout
const { Item } = Menu

export const MyHeader = () => (
  <Header>
    <span className={styles.title}>Face Trainer</span>
    <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px', display: 'inline' }}
    >
      <Item className={styles.liOverwrite} key='1'>
        <IndexLink to='/' className={styles.link} activeClassName={styles.active}>Home</IndexLink>
      </Item>
      <Item className={styles.liOverwrite} key='3'>
        <Link to='config' className={styles.link} activeClassName={styles.active}>Configure</Link>
      </Item>
      <Item className={styles.liOverwrite} key='2'>
        <Link to='person-groups' className={styles.link} activeClassName={styles.active}>Manage</Link>
      </Item>
      <Item className={styles.liOverwrite} key='4'>
        <Link to='test' className={styles.link} activeClassName={styles.active}>Test</Link>
      </Item>
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
