import { atom } from 'recoil';

export const isErrorState = atom({
  key: 'isError',
  default: false,
});

export const errorMessageState = atom({
  key: 'errorMessage',
  default: '',
});

export const isRequestListOpenState = atom({
  key: 'isRequestListOpen',
  default: false,
});
