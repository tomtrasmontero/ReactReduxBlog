import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST } from '../actions/index';

// default state to an [] when initialy renders
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      // // actions.payload.data is a promise send by axios request
      // const post = action.payload.data;
      // // ...state is taking all the states in the current obj
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;
      // ***** ES6 ***** take the current state and concat them wih key:value pair
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
