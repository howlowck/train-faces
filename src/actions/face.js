/* global fetch */
import { getApiHeaders } from 'support/helpers'
export const UPLOAD_BASE64_FACE = 'UPLOAD_BASE64_FACE'
export const DELETE_FACE = 'DELETE_FACE'
export const INPUT_CHANGE_NEW_FACE_USER_DATA = 'INPUT_CHANGE_NEW_FACE_USER_DATA'
export const CREATE_FACE_WITH_DATA = 'CREATE_FACE_WITH_DATA'
// Add Action String Constant Here (do not delete this line)

export const deleteFace = (groupId, personId, faceId) => (dispatch, getState) => {
  return fetch('/face', {
    method: 'delete',
    headers: getApiHeaders(getState()),
    body: JSON.stringify({
      groupId,
      personId,
      faceId
    })
  })
  .then(res => res.json())
}

export const inputChangeNewFaceUserData = (data) => ({
  type: INPUT_CHANGE_NEW_FACE_USER_DATA,
  data
})

export const createFaceWithData = (groupId, personId, data, userData) => (dispatch, getState) => {
  return fetch('/face', {
    method: 'post',
    headers: getApiHeaders(getState()),
    body: JSON.stringify({
      base64: data,
      groupId,
      personId,
      userData
    })
  }).then((res) => {
    return res.json()
  })
}

// Add Action Creator Here (do not delete this line)
