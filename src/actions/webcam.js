export const INPUT_CHANGE_WEBCAM_IMAGE = 'INPUT_CHANGE_WEBCAM_IMAGE'
export const INPUT_CHANGE_NEW_FACE_IMAGE = 'INPUT_CHANGE_NEW_FACE_IMAGE'
export const INPUT_CHANGE_WEBCAM_IDENTIFY_IMAGE = 'INPUT_CHANGE_WEBCAM_IDENTIFY_IMAGE'
// Add Action String Constant Here (do not delete this line)

export const inputChangeWebcamImage = (data) => ({
  type: INPUT_CHANGE_WEBCAM_IMAGE,
  data
})

export const inputChangeNewFaceImage = (data) => ({
  type: INPUT_CHANGE_NEW_FACE_IMAGE,
  data
})

export const inputChangeWebcamIdentifyImage = (data) => ({
  type: INPUT_CHANGE_WEBCAM_IDENTIFY_IMAGE,
  data
})

// Add Action Creator Here (do not delete this line)
