import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  GET_IMAGES: 'GET_IMAGES',
  NEXT_IMAGE: 'NEXT_IMAGE',
  PREVIOUS_IMAGE: 'PREVIOUS_IMAGE',
  ROVER_ERROR_SET: 'ROVER_ERROR_SET',
};

export const ROOT_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

export function getMarsImages() {
  // getting today's date
  const today = new Date();
  const todaysDate = `${String(today.getFullYear())}-${String(today.getMonth() + 1)}-${today.getDate() - 1}`;
  return (dispatch) => {
    // async axios call to get Mars Rover Images
    axios.get(`${ROOT_URL}`, { params: { earth_date: todaysDate, api_key: 'DEMO_KEY' } })
      .then((response) => {
        dispatch({ type: ActionTypes.GET_IMAGES, payload: response.data.photos });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ROVER_ERROR_SET, error });
      });
  };
}

export function getNextImage() {
  return {
    type: ActionTypes.NEXT_IMAGE,
    payload: null,
  };
}

export function getPreviousImage() {
  return {
    type: ActionTypes.PREVIOUS_IMAGE,
    payload: null,
  };
}

export function setRoverError() {
  return {
    type: ActionTypes.ROVER_ERROR_SET,
    payload: 'There are no images.',
  };
}
