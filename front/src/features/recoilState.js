import { atom } from 'recoil';

export const isErrorState = atom({
  key: 'isError',
  default: false,
});

export const errorMessageState = atom({
  key: 'errorMessage',
  default: '',
});

export const isChatOpenState = atom({
  key: 'isChatOpen',
  default: false,
});

export const isChatWiState = atom({
  key: 'chatId',
  default: 0,
});

export const isRequestListOpenState = atom({
  key: 'isRequestListOpen',
  default: false,
});

export const isGroupRequestListOpenState = atom({
  key: 'isGroupRequestListOpen',
  default: false,
});
