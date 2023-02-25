import { combineReducers } from 'redux';

import MarsRoverReducer from './mars-rover-reducer';

const rootReducer = combineReducers({
  marsPhotos: MarsRoverReducer,
});

export default rootReducer;
