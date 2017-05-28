/* global fetch */
import { getApiHeaders, getFaceApiEndpoint, getBufferFromBase64 } from 'support/helpers'
export const UPLOAD_BASE64_FACE = 'UPLOAD_BASE64_FACE'
export const DELETE_FACE = 'DELETE_FACE'
export const INPUT_CHANGE_NEW_FACE_USER_DATA = 'INPUT_CHANGE_NEW_FACE_USER_DATA'
export const CREATE_FACE_WITH_DATA = 'CREATE_FACE_WITH_DATA'
export const DETECT_FACE = 'DETECT_FACE'
export const IDENTIFY_FACE = 'IDENTIFY_FACE'
export const SET_DETECTED_FACES = 'SET_DETECTED_FACES'
export const SET_IDENTIFIED_RESULTS = 'SET_IDENTIFIED_RESULTS'
export const RESET_IDENTIFY_FACE = 'RESET_IDENTIFY_FACE'
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
  const endpoint = getFaceApiEndpoint(getState())
  const defaultHeaders = getApiHeaders(getState())
  return getBufferFromBase64(data).then((blob) => {
    return fetch(`${endpoint}/persongroups/${groupId}/persons/${personId}/persistedFaces`, {
      method: 'post',
      headers: {
        ...defaultHeaders,
        'Content-Type': 'application/octet-stream'
      },
      body: blob
    })
  }).then((res) => {
    return res.json()
  })
}

export const detectFace = (data) => (dispatch, getState) => {
  const endpoint = getFaceApiEndpoint(getState())
  const defaultHeader = getApiHeaders(getState())
  return getBufferFromBase64(data).then((blob) => {
    return fetch(`${endpoint}/detect`, {
      method: 'post',
      headers: {
        ...defaultHeader,
        'Content-Type': 'application/octet-stream'
      },
      body: blob
    })
  })
  .then((res) => {
    return res.json()
  })
}

export const identifyFace = (faceIdArray, groupId) => (dispatch, getState) => {
  const endpoint = getFaceApiEndpoint(getState())
  return fetch(`${endpoint}/identify`, {
    method: 'post',
    headers: getApiHeaders(getState()),
    body: JSON.stringify({
      faceIds: faceIdArray,
      personGroupId: groupId,
      maxNumOfCandiatesReturned: 3
    })
  }).then((res) => {
    return res.json()
  })
}

export const setDetectedFaces = (data) => ({
  type: SET_DETECTED_FACES,
  data
})

export const setIdentifiedResults = (data) => ({
  type: SET_IDENTIFIED_RESULTS,
  data
})

export const resetIdentifyFace = (data) => ({
  type: RESET_IDENTIFY_FACE,
  data
})

// Add Action Creator Here (do not delete this line)
