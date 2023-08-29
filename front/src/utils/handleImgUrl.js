// images/img_13c964ce-e832-4209-af8f-0fddd8b0fa26.jpeg
export const handleImgUrl = (url) => {
  if (!url) {
    return;
  }

  // src/public/images/이미지.jpeg
  const mordernUrl = url.replace(/\\/g, '/');

  const mordern2Url = mordernUrl.replace(/\\/g, '/');
  // /public/images/이미지.jpeg
  const tagUrl = mordern2Url.replace(
    'images/',
    'http://34.64.122.168:3001/images/',
  );

  return tagUrl;
};

//http://34.64.122.168:3001/images/img_eab27b7c-d788-4fca-aa39-eab27ee78887.jpeg
