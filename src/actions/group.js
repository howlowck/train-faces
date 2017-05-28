/* global fetch */
import { notification } from 'antd'
import { getApiHeaders, getFaceApiEndpoint } from 'support/helpers'
import { snakeCase } from 'lodash'

export const CREATE_PERSON_GROUP = 'CREATE_PERSON_GROUP'
export const REQUEST_LIST_PERSON_GROUPS = 'REQUEST_LIST_PERSON_GROUPS'
export const SET_PERSON_GROUPS = 'SET_PERSON_GROUPS'
export const INPUT_CHANGE_NEW_GROUP_NAME = 'INPUT_CHANGE_NEW_GROUP_NAME'
export const DELETE_GROUP = 'DELETE_GROUP'
export const TRAIN_GROUP = 'TRAIN_GROUP'
export const SET_TRAINING_STATUS = 'SET_TRAINING_STATUS'
export const SET_IDENTIFY_GROUP = 'SET_IDENTIFY_GROUP'
// Add Action String Constant Here (do not delete this line)

export const createPersonGroup = () => (dispatch, getState) => {
  const newGroupName = getState().inputs.new_group_name.value
  const groupId = snakeCase(newGroupName).toLowerCase()

  notification.open({
    message: 'Info',
    description: 'Creating Person Group',
    duration: 0,
    key: 'creating-person-group'
  })

  const endpoint = getFaceApiEndpoint(getState())
  console.log(groupId)
  return fetch(`${endpoint}/persongroups/${groupId}`, {
    method: 'put',
    headers: getApiHeaders(getState()),
    body: JSON.stringify({
      name: newGroupName
    })
  }).then((res) => {
    notification.close('creating-person-group')
    return dispatch(requestListPersonGroups())
  })
}

export const requestListPersonGroups = () => (dispatch, getState) => {
  const endpoint = getFaceApiEndpoint(getState())
  return fetch(`${endpoint}/persongroups`, {
    headers: getApiHeaders(getState())
  }).then(res => res.json())
    .then(data => {
      return dispatch(setPersonGroups(data))
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

export const deleteGroup = (groupId) => (dispatch, getState) => {
  const endpoint = getFaceApiEndpoint(getState())
  return fetch(`${endpoint}/persongroups/${groupId}`, {
    method: 'delete',
    headers: getApiHeaders(getState())
  })
  .then(() => {
    return dispatch(requestListPersonGroups())
  })
}

export const trainGroup = (groupId) => (dispatch, getState) => {
  const endpoint = getFaceApiEndpoint(getState())
  return fetch(`${endpoint}/persongroups/${groupId}/train`, {
    method: 'post',
    headers: getApiHeaders(getState()),
    body: JSON.stringify({
      groupId
    })
  })
}

export const getTrainingStatus = (groupId) => (dispatch, getState) => {
  const endpoint = getFaceApiEndpoint(getState())
  return fetch(`${endpoint}/persongroups/${groupId}/training`, {
    headers: getApiHeaders(getState())
  })
  .then(res => res.json())
}

export const setTrainingStatus = (groupId, data) => ({
  type: SET_TRAINING_STATUS,
  groupId,
  data
})

export const setIdentifyGroup = (data) => ({
  type: SET_IDENTIFY_GROUP,
  data
})

// Add Action Creator Here (do not delete this line)
