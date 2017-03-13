import React from 'react'
import Header from '../../components/Header'
import { Layout } from 'antd'
const { Content, Footer } = Layout
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <Layout className='layout'>
    <Header />
    <Content style={{ padding: '0 50px' }}>
      <div style={{ background: '#fff', padding: 0, minHeight: 280 }}>{children}</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
       Created by Hao Luo
    </Footer>
  </Layout>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
