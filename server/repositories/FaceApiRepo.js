const { Client } = require('project-oxford')

class FaceApiRepo {

  constructor (apiKey) {
    this.client = new Client(apiKey)
  }

  getPersonGroups () {
    return this.client.face.personGroup.list()
  }

  getPersons (personGroupId) {
    return this.client.face.person.list(personGroupId)
  }

  getFace (personGroupId, personId, faceId) {
    return this.client.face.person.getFace(personGroupId, personId, faceId)
  }

  createPersonGroup (id, name, userData = {}) {
    return this.client.face.personGroup.create(id, name, userData)
  }

  createPerson (personGroupId, { name, userData = {} }) {
    return this.client.face.person.create(personGroupId, name, userData)
  }

  createFace (personGroupId, personId, { data, userData = {} }) {
    return this.client.face.person.addFace(personGroupId, personId, { data, userData })
  }

}

module.exports = FaceApiRepo
