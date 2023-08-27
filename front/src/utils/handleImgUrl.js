// src\\public\\images\\이미지.jpeg
export const handleImgUrl = (url) => {
  if (!url) {
    return;
  }

  // src/public/images/이미지.jpeg
  const mordernUrl = url.replace(/\\/g, '/');

  const mordern2Url = mordernUrl.replace(/\\/g, '/');
  // /public/images/이미지.jpeg
  const tagUrl = mordern2Url.replace('src/public/images', '');

  return tagUrl;
};
