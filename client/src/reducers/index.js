// Import All reducer

import changeHabitTarget from './incDecHabitTarget.js';
import createHabit from './createHabit.js';
import openDialogueBoxes from './openDialogueBoxes.js';
import userAuth from './userAuth.js';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    // Send all the reducers from here
    changeHabitTarget,
    createHabit,
    openDialogueBoxes,
    userAuth
})

export default rootReducer;