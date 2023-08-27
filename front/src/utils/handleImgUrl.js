// src\\public\\images\\이미지.jpeg
export const handleImgUrl = (url) => {
  if (!url) {
    return;
  }

  // src/public/images/이미지.jpeg
  const mordernUrl = url.replace(/\\/g, '/');

  // /public/images/이미지.jpeg
  const tagUrl = mordernUrl.replace('src/public', 'public');

  return tagUrl;
};
