import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { email: '', nickName: '' },
  reducers: {
    login(state, action) {
      //api요청 후 반환값을 state에 넣기
      state = {
        email: action.payload.email,
        nickName: action.payload.nickName,
      };
    },
    register(state, action) {
      //api요청 후 반환값을 state에 넣기 => 회원가입하면 자동 로그인됨
      state = {
        email: action.payload.email,
        nickName: action.payload.nickName,
      };
    },
    logout(state, action) {
      //api요청 후 state를 삭제함
      state.email = '';
      state.nickName = '';
    },
  },
});

export const { login, register, logout } = userSlice.actions;
export default userSlice.reducer;
