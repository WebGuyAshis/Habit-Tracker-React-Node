// Import All reducer

import createHabit from './createHabit.js';
import openDialogueBoxes from './openDialogueBoxes.js';
import userAuth from './userAuth.js';
import userHabitData from './userHabit.js';
import selectedHabitDetail from './selectedHabitDetail.js';
import userHabits from './fetchUserHabits.js';


import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    // Send all the reducers from here
    createHabit,
    openDialogueBoxes,
    userAuth,
    userHabitData,
    selectedHabitDetail,
    userHabits
})

export default rootReducer;