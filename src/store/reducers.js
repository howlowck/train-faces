import { combineReducers } from 'redux'
import locationReducer from './location'
import guestsReducer from 'reducers/guests'
import requestsReducer from 'reducers/requests'
import configReducer from 'reducers/config'
// Import Reducers Here (do not delete this line)

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    guests: guestsReducer,
    requests: requestsReducer,
    config: configReducer,
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
