import { decode } from 'base64-arraybuffer'

/**
 * Returns concatenated list of css class names separated
 * by a white space
 *
 * @param names
 * @returns {string}
 */
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
  } catch (e) { }

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
