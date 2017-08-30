import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  // form key word must be used to wire redux-form
  form: formReducer,
});

export default rootReducer;
