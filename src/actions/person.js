export const SET_PERSONS = 'SET_PERSONS'
export const REQUEST_LIST_PERSONS = 'REQUEST_LIST_PERSONS'
export const INPUT_CHANGE_NEW_PERSON_NAME = 'INPUT_CHANGE_NEW_PERSON_NAME'
export const INPUT_CHANGE_NEW_PERSON_USER_DATA = 'INPUT_CHANGE_NEW_PERSON_USER_DATA'
// Add Action String Constant Here (do not delete this line)

export const setPersons = (groupId, data) => {
  return {
    type: SET_PERSONS,
    groupId,
    data
  }
}

export const createPerson = (groupId, name, userData) => (dispatch) => {
  return fetch('/persons', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      groupId,
      name,
      userData
    })
  })
  .then(res => res.json())
  .then(data => data.personId)
}

export const requestListPersons = (groupId) => (dispatch) => {
  return fetch(`/persons?group_id=${groupId}`)
    .then(res => res.json())
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

// Add Action Creator Here (do not delete this line)
