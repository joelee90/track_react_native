import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import tracker from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signup':
      return { errorMessage: '', token: action.payload };
    default:
      return state;
  }
};

const signup = (dispatch) => async ({ email, password }) => {
  // api req to signup with email, password
  // if success, modify the state, authenticate the user
  // if fails, reflect error message
  try {
    const response = await tracker.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({
      type: 'signup',
      payload: response.data.token,
    });
    navigate('TrackList');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up',
    });
  }
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    // try to signin
    // if success, update the state,
    // if fail, show error message
  };
};

const signout = (dispatch) => {
  return () => {};
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { token: null, errorMessage: '' }
);
