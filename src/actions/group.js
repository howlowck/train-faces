/* global fetch */
import { notification } from 'antd'

export const CREATE_PERSON_GROUP = 'CREATE_PERSON_GROUP'
export const REQUEST_LIST_PERSON_GROUPS = 'REQUEST_LIST_PERSON_GROUPS'
export const SET_PERSON_GROUPS = 'SET_PERSON_GROUPS'
export const INPUT_CHANGE_NEW_GROUP_NAME = 'INPUT_CHANGE_NEW_GROUP_NAME'
// Add Action String Constant Here (do not delete this line)

export const createPersonGroup = () => (dispatch, getState) => {
  const newGroupName = getState().inputs.new_group_name.value

  notification.open({
    message: 'Info',
    description: 'Creating Person Group',
    duration: 0,
    key: 'creating-person-group'
  })

  fetch('/person-groups', {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      name: newGroupName
    })
  }).then((res) => {
    return res.json()
  }).then((data) => {
    notification.close('creating-person-group')
    dispatch(requestListPersonGroups())
  })
}

export const requestListPersonGroups = () => (dispatch) => {
  fetch('/person-groups').then(res => res.json())
    .then(data => {
      dispatch(setPersonGroups(data))
    })
}

export const setPersonGroups = (data) => ({
  type: SET_PERSON_GROUPS,
  data
})

export const inputChangeNewGroupName = (data) => ({
  type: INPUT_CHANGE_NEW_GROUP_NAME,
  data
})

// Add Action Creator Here (do not delete this line)
