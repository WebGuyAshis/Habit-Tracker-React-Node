// Import All reducer

import changeHabitTarget from './incDecHabitTarget.js';
import createHabit from './createHabit.js';
import openDialogueBoxes from './openDialogueBoxes.js';
import userAuth from './userAuth.js';
import userHabitData from './userHabit.js';
import selectedHabitDetail from './selectedHabitDetail.js';


import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    // Send all the reducers from here
    changeHabitTarget,
    createHabit,
    openDialogueBoxes,
    userAuth,
    userHabitData,
    selectedHabitDetail
})

export default rootReducer;