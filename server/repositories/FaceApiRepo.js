const { Client } = require('project-oxford')

class FaceApiRepo {
  constructor (apiKey) {
    this.client = new Client(apiKey)
  }

  getPersonGroups () {
    return this.client.face.personGroup.list()
  }

  deletePersonGroup (personGroupId) {
    return this.client.face.personGroup.delete(personGroupId)
  }

  createPersonGroup (id, { name, userData = '' }) {
    return this.client.face.personGroup.create(id, name, userData)
  }

  createPerson (personGroupId, { name, userData = '' }) {
    return this.client.face.person.create(personGroupId, name, userData)
  }

  deletePerson (personGroupId, personId) {
    return this.client.face.person.delete(personGroupId, personId)
  }

  getPersons (personGroupId) {
    return this.client.face.person.list(personGroupId)
  }

  getPerson (personGroupId, personId) {
    return this.client.face.person.get(personGroupId, personId)
  }

  getFace (personGroupId, personId, faceId) {
    return this.client.face.person.getFace(personGroupId, personId, faceId)
  }

  deleteFace (personGroupId, personId, faceId) {
    return this.client.face.person.deleteFace(personId, personId, faceId)
  }

  createFace (personGroupId, personId, { data, userData = '' }) {
    return this.client.face.person.addFace(personGroupId, personId, { data, userData })
  }
}

module.exports = FaceApiRepo
