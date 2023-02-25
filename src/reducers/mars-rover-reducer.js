import { ActionTypes } from '../actions';

const initialState = {
  images: [], // list of all images from the previous day taken by the Mars Rover
  current: 0, // the index of the current image being displayed
  error: null, // error state if fetch from api goes awry
};

const MarsRoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_IMAGES:
      return { ...state, images: action.payload };
    case ActionTypes.NEXT_IMAGE:
      return { ...state, current: state.current === state.images.length - 1 ? 0 : state.current + 1 };
    case ActionTypes.PREVIOUS_IMAGE:
      return { ...state, current: state.current === 0 ? state.images.length - 1 : state.current - 1 };
    case ActionTypes.ROVER_ERROR_SET:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default MarsRoverReducer;
