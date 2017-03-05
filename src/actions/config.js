import configKeys from 'constants/configKeys'

/* global localStorage */
export const SET_CONFIG = 'SET_CONFIG'
export const LOAD_CONFIG = 'LOAD_CONFIG'
// Add Action String Constant Here (do not delete this line)

export const setConfig = (data) => {
  localStorage.setItem('smartPhotobooth' + data.key, data.value)
  return {
    type: SET_CONFIG,
    data
  }
}

export const loadConfig = () => {
  const data = configKeys.map((configKey) => {
    const value = localStorage.getItem('smartPhotobooth' + configKey)
    return { key: configKey, value }
  })
  return {
    type: LOAD_CONFIG,
    data
  }
}

// Add Action Creator Here (do not delete this line)

