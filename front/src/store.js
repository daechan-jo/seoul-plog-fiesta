import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

/*

/src/page
import { useDispatch } from 'react-redux'
const dispatch = useDispatch();
dispatch(login({ email: 'hi@gmail.com', pw: 'mypasswrod'}))

>> 해당 email, pw을 확인하고 email, nickname를 반환함 => state에 저장함
*/
