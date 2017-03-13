/* global fetch */

export const UPLOAD_BASE64_FACE = 'UPLOAD_BASE64_FACE'
export const DELETE_FACE = 'DELETE_FACE'
// Add Action String Constant Here (do not delete this line)

export const uploadBase64Face = (groupId, personId, data) => (dispatch) => {
  return fetch('/face', {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      base64: data,
      groupId,
      personId
    })
  }).then((res) => {
    return res.json()
  }).then((data) => {
    return data.persistedFaceId
  })
}

export const deleteFace = (groupId, personId, faceId) => (dispatch) => {
  return fetch('/face', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      groupId,
      personId,
      faceId
    })
  })
  .then(res => res.json())
}

// Add Action Creator Here (do not delete this line)
