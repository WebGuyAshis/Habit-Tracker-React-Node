// Import All reducer

import changeHabitTarget from './incDecHabitTarget.js'

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    // Send all the reducers from here
    changeHabitTarget
})

export default rootReducer;