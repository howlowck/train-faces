/* global fetch */

export const UPLOAD_BASE64_FACE = 'UPLOAD_BASE64_FACE'
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

// Add Action Creator Here (do not delete this line)
