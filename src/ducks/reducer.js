const initialState = {
  email: '',
  username: '',
  user_image: '',
  user_id: 0
}

const  UPDATE_USER = 'UPDATE_USER';

export function updateUser(user) {
  return {
    type: UPDATE_USER, 
    payload: user
  }
}

export default function reducer(state=initialState, action) {
  const {type, payload} = action;
  switch(type){
    case UPDATE_USER:
      const {user_id, email, user_image, username} = payload
      return {...state, user_id, username, email, user_image }
    default:
      return state;
  }
}
