import { combineReducers } from 'redux'
import locationReducer from './location'
import guestsReducer from 'reducers/guests'
import requestsReducer from 'reducers/requests'
import configReducer from 'reducers/config'
import personGroupsReducer from 'reducers/personGroups'
import inputsReducer from 'reducers/inputs'
import personsReducer from 'reducers/persons'
import facesReducer from 'reducers/faces'
import uiReducer from 'reducers/ui'
import trainingStatusReducer from 'reducers/trainingStatus'
import identifyReducer from 'reducers/identify'
// Import Reducers Here (do not delete this line)

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    guests: guestsReducer,
    requests: requestsReducer,
    config: configReducer,
    personGroups: personGroupsReducer,
    inputs: inputsReducer,
    persons: personsReducer,
    faces: facesReducer,
    ui: uiReducer,
    trainingStatus: trainingStatusReducer,
    identify: identifyReducer,
    // Add Reducers Here (do not delete this line)
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
