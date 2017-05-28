/* global fetch */
import { getApiHeaders, getFaceApiEndpoint } from 'support/helpers'
export const SET_PERSONS = 'SET_PERSONS'
export const REQUEST_LIST_PERSONS = 'REQUEST_LIST_PERSONS'
export const INPUT_CHANGE_NEW_PERSON_NAME = 'INPUT_CHANGE_NEW_PERSON_NAME'
export const INPUT_CHANGE_NEW_PERSON_USER_DATA = 'INPUT_CHANGE_NEW_PERSON_USER_DATA'
export const DELETE_PERSON = 'DELETE_PERSON'
export const REQUEST_GET_PERSON = 'REQUEST_GET_PERSON'
export const SET_A_PERSON = 'SET_A_PERSON'
// Add Action String Constant Here (do not delete this line)

export const setPersons = (groupId, data) => {
  return {
    type: SET_PERSONS,
    groupId,
    data
  }
}

export const createPerson = (groupId, name, userData) => (dispatch, getState) => {
  const endpoint = getFaceApiEndpoint(getState())

  const bodyPayload = JSON.stringify({
    name,
    userData: JSON.stringify(userData)
  })

  return fetch(`${endpoint}/persongroups/${groupId}/persons`, {
    method: 'post',
    headers: getApiHeaders(getState()),
    body: bodyPayload
  })
  .then(res => res.json())
  .catch((err) => {
    console.error(err.message)
  })
  .then(data => data.personId)
  .catch((err) => {
    console.error(err.message)
  })
}

export const requestListPersons = (groupId) => (dispatch, getState) => {
  const endpoint = getFaceApiEndpoint(getState())
  return fetch(`${endpoint}/persongroups/${groupId}/persons`, {
    headers: getApiHeaders(getState())
  })
    .then(res => res.json())
    .then(personsList => {
      return personsList.map(person => {
        return {
          ...person,
          userData: JSON.parse(person.userData) || person.userData
        }
      })
    })
}

export const inputChangeNewPersonName = (nested, data) => ({
  type: INPUT_CHANGE_NEW_PERSON_NAME,
  nested,
  data
})

export const inputChangeNewPersonUserData = (nested, data) => ({
  type: INPUT_CHANGE_NEW_PERSON_USER_DATA,
  nested,
  data
})

export const deletePerson = (groupId, personId) => (dispatch, getState) => {
  const endpoint = getFaceApiEndpoint(getState())

  return fetch(`${endpoint}/persongroups/${groupId}/persons/${personId}`, {
    method: 'delete',
    headers: getApiHeaders(getState())
  })
  .then(() => {
    return dispatch(requestListPersons(groupId))
  }).then((data) => {
    return dispatch(setPersons(groupId, data))
  })
}

export const requestGetPerson = (groupId, personId) => (dispatch, getState) => {
  const endpoint = getFaceApiEndpoint(getState())
  return fetch(`${endpoint}/persongroups/${groupId}/persons/${personId}`, {
    headers: getApiHeaders(getState())
  })
    .then(res => res.json())
}

export const setAPerson = (groupId, personId, data) => ({
  type: SET_A_PERSON,
  groupId,
  personId,
  data
})

// Add Action Creator Here (do not delete this line)
