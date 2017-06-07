/* global btoa, fetch */

import { decode } from 'base64-arraybuffer'

export function classNames (names) {
  const filtered = names.filter((className) => !!className)
  return filtered.join(' ')
}

/**
 * Count the bytes of a given string
 *
 * @param content
 * @returns {int}
 */

export function byteCount (content) {
  return decode(btoa(content)).byteLength
}

/**
 * Validate if string is Json Parsable
 *
 * @param str
 * @return {bool}
 */

export function isJsonString (str) {
  try {
    var o = JSON.parse(str)
    if (o && typeof o === 'object') {
      return o
    }
  } catch (e) {
    console.error(e)
  }

  return false
}

/**
 * Get Shrug Emoji ¯\_(ツ)_/¯
 *
 * @return {string}
 */

export function getShrug () {
  return '¯\\_(ツ)_/¯'
}

export function getApiHeaders (state) {
  return {
    'Content-Type': 'application/json; charset=UTF-8',
    'Ocp-Apim-Subscription-Key': state.config.FaceApiKey
  }
}

export function getFaceApiEndpoint (state) {
  return state.config.FaceApiEndpoint
}

export function getBufferFromBase64 (base64) {
  return fetch(base64)
          .then(res => res.blob())
}

export function getScaleImageFit ({ imageWidth, imageHeight }, { constraintWidth, constraintHeight }) {
  let scaleWidth = constraintWidth / imageWidth
  let scaleHeight = constraintHeight / imageHeight
  if (scaleWidth < scaleHeight) {
    return scaleWidth
  }
  return scaleHeight
}
