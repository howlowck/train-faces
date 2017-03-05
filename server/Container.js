function Container () {
  this.abstract = {}
  this.singleton = {}
  this.lookup = {}
}

Container.prototype.register = function (abstractName, callback, singleton = false) {
  this.lookup[abstractName] = {
    callback,
    singleton,
    instance: null
  }
}

Container.prototype.get = function (abstractName, args = []) {
  let abstractObj = this.lookup[abstractName]
  if (abstractObj.singleton && abstractObj.instance) {
    console.log(`getting existing ${abstractName} singleton instance`)
    return abstractObj.instance
  }
  if (abstractObj.singleton) {
    console.log(`creating new ${abstractName} singleton instance`)
    abstractObj.instance = abstractObj.callback.apply(this, args)
    return abstractObj.instance
  }

  console.log(`creating new ${abstractName} instance`)
  return abstractObj.callback.apply(this, args)
}

module.exports = Container
