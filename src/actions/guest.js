/* global fetch */

export const REQUEST_ALL_GUESTS = 'REQUEST_ALL_GUESTS'
export const RECEIVE_ALL_GUESTS = 'RECEIVE_ALL_GUESTS'
export const ADD_NEW_GUEST = 'ADD_NEW_GUEST'
// Add Action String Constant Here (do not delete this line)

const baseUrl = 'https://smart-photobooth-start-af.azurewebsites.net'

export const requestAllGuests = () => ({
  type: REQUEST_ALL_GUESTS
})

export const receiveAllGuests = (data) => ({
  type: RECEIVE_ALL_GUESTS,
  data
})

export const addNewGuest = (data) => ({
  type: ADD_NEW_GUEST,
  data
})

// Add Action Creator Here (do not delete this line)

export const getAllGuests = () => (dispatch) => {
  const db = 'play'
  const collection = 'start'
  const url = baseUrl + `/api/${db}/${collection}`
  dispatch(requestAllGuests())
  fetch(url, { method: 'GET', mode: 'cors' })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
      dispatch(receiveAllGuests(data))
    })
}

export const submitNewGuest = (data) => (dispatch) => {
  const url = baseUrl + `/create-new-guests`
  fetch(url, { method: 'POST', mode: 'cors' })
}
