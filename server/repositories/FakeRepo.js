const uuid = require('uuid/v1')

// Fake Face API Repo
// personGroups = [
//   {
//     <string> personGroupId,
//     <string> name,
//     <string> userData
//   }
// ]
// persons = Map: {
//   'fake-group' => [
//     {
//       <string> personId,
//       <string>name,
//       <string> userData,
//       <Array[string]> persistedFaceIds
//     },
//   ]
// }
// faces = Map: {
//   "015839fb-fbd9-4f79-ace9-7675fc2f1dd9" => {
//      <string> persistedFaceId,
//      <string> userData
//   }
// }

class FakeRepo {
  constructor (apiKey) {
    this.personGroups = [{
      personGroupId: 'test_group',
      name: 'Test Group',
      userData: ''
    }]
    this.persons = new Map()
    this.faces = new Map()
  }

  createPersonGroup (groupId, { name, userData = '' }) {
    if (!this.personGroups.find((group) => group.personGroupId === groupId)) {
      this.personGroups.push({ personGroupId: groupId, name, userData })
    }

    return new Promise((resolve, reject) => resolve({}))
  }

  getPersonGroups () {
    const personGroups = this.personGroups
    return new Promise((resolve, reject) => resolve(personGroups))
  }

  deletePersonGroup (personGroupId) {
    this.personGroups = this.personGroups.filter((group) => group.personGroupId !== personGroupId)
    return new Promise((resolve, reject) => resolve({}))
  }

  createPerson (personGroupId, { name, userData = '' }) {
    const personsArray = this.persons.has(personGroupId) ? this.persons.get(personGroupId) : []
    const personId = uuid()
    personsArray.push({ personId, name, userData, persistedFaceIds: [] })
    this.persons.set(personGroupId, personsArray)
    return new Promise((resolve, reject) => resolve({ personId }))
  }

  getPersons (personGroupId) {
    const personsArray = this.persons.has(personGroupId) ? this.persons.get(personGroupId) : null
    return new Promise((resolve, reject) => resolve(personsArray))
  }

  deletePerson (personGroupId, personId) {
    const newPersonsArray = this.persons.get(personGroupId).filter((person) => person.personId !== personId)
    this.persons.set(personGroupId, newPersonsArray)
    return new Promise((resolve, reject) => resolve({}))
  }

  createFace (personGroupId, personId, { data, userData = '' }) {
    if (!this.persons.has(personGroupId)) {
      return new Promise((resolve, reject) => reject(new Error('Group not found')))
    }
    const personsArray = this.persons.get(personGroupId)
    const person = personsArray.find((person) => person.personId === personId)
    if (typeof person === 'undefined') {
      return new Promise((resolve, reject) => reject(new Error('Person not found')))
    }
    const newFaceId = uuid()
    person.persistedFaceIds.push(newFaceId)
    this.faces.set(newFaceId, { persistedFaceId: newFaceId, userData })
    return new Promise((resolve, reject) => resolve({ persistedFaceId: newFaceId }))
  }

  getFace (personGroupId, personId, faceId) {
    const faceObj = this.faces.has(faceId) ? this.faces.get(faceId) : null
    return new Promise((resolve, reject) => resolve(faceObj))
  }

  deleteFace (personGroupId, personId, faceId) {
    this.faces.delete(faceId)
    const person = this.persons.get(personGroupId).find(person => person.personId === personId)
    if (person) {
      const newPersistedFaceIds = person.persistedFaceIds.filter(id => id !== faceId)
      person.persistedFaceIds = newPersistedFaceIds
    }
    return new Promise((resolve, reject) => resolve({}))
  }
}

module.exports = FakeRepo
