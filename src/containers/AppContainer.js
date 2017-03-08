import React, { Component, PropTypes } from 'react'
import { hashHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <LocaleProvider locale={enUS}>
        <Provider store={store}>
          <div style={{ height: '100%' }}>
            <Router history={hashHistory} children={routes} />
          </div>
        </Provider>
      </LocaleProvider>
    )
  }
}

export default AppContainer
