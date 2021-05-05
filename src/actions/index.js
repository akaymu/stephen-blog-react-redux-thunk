import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach((id) => dispatch(fetchUser(id)));

  // Yukarıdaki 2 satırı chain ile aşağıdaki hale getirdik
  // value() demezsek sadece chain haline getirir execute etmez :)
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get('/posts');
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};


export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data });
};


// // Memoization solution - ama API içindeki veriler değişiyorsa
// // hep aynı sonucu almamamız için malesef başka bir
// // action creator ile veriyi memoize etmeden almamız gerekiyor.
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });




// function createThunkMiddleware (extraArgument) {
//   return ({dispatch, getState}) => next => action => {
//     if(typeof action === 'function') {
//       return action(dispatch, getState, extraArgument);
//     }

//     return next(action);
//   }
// }

// const thunk = createThunkMiddleware();
// thunk.withExtraArgument = createThunkMiddleware;
// export default thunk;

