const initialState = {
  email: '',
  username: '',
  user_image: '',
  user_id: 0,
  city: '',
  country: '',
  weather: ''
}

const  UPDATE_USER = 'UPDATE_USER'
const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION'
const CLEAR_USER = 'CLEAR_USER'

export function updateUser(user) {
  return {
    type: UPDATE_USER, 
    payload: user
  }
}

export function updateUserInfo(user_image, username){
  return {
    type: UPDATE_USER_INFO,
    payload: user_image, username
  }
}

export function updateUserLocation(city,  country){
  return {
    type: UPDATE_USER_LOCATION,
    payload: city,country
    }
}

export function clearUser(){
  return {
    type: CLEAR_USER
  }
}



export default function reducer(state=initialState, action) {
  const {type, payload} = action;
  switch(type){
    case UPDATE_USER:
      const {user_id, email, user_image, username, city, country} = payload
      return {...state, user_id, username, email, user_image, city, country }
    case UPDATE_USER_INFO:
      return {...state, user_image, username}
    // case UPDATE_USER_LOCATION:
    //   const {city, country} = payload[0]
    //   return {...state, city, country}
    case CLEAR_USER:
      return {...state, id: 0, username: '', email: '', user_image: ''}
    default:
      return state;
  }
}
