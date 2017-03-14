import { SET_PERSONS, SET_A_PERSON } from 'actions/person'

export default (prevState = {}, action) => {
  // Add your action conditionals here
  if (action.type === SET_PERSONS) {
    const { groupId, data: persons } = action
    const newPersons = { ...prevState }
    newPersons[groupId] = persons
    return newPersons
  }
  if (action.type === SET_A_PERSON) {
    const { groupId, personId, data: person } = action
    const personsInGroupArray = prevState[groupId] || []
    const index = personsInGroupArray.findIndex((person) => person.personId === personId)
    let newPersonsArray
    if (index > -1) {
      newPersonsArray = [
        ...personsInGroupArray.slice(0, index),
        person,
        ...personsInGroupArray.slice(index + 1)
      ]
    } else {
      newPersonsArray = [].concat(person)
    }

    const clonedPersons = { ...prevState }
    clonedPersons[groupId] = newPersonsArray
    return clonedPersons
  }

  return { ...prevState }
}
