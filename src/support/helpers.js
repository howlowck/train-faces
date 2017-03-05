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
