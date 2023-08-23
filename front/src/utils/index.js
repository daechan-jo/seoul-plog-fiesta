export function handleImgChange(e) {
  const img = e.target.files[0];

  if (!img) {
    alert('JPG 확장자의 이미지 파일을 넣어주세요.');
    return;
  } else if (img.type !== 'image/jpeg' && img.type !== 'image/jpg') {
    alert('JPG 확장자의 이미지 파일만 등록 가능합니다.');
    return;
  }
  if (img) {
    try {
      const reader = new FileReader();

      reader.onload = () => {
        const previewImg = document.getElementById('previewImg');
        previewImg.src = reader.result;
      };

      reader.readAsDataURL(img);
    } catch (e) {
      alert(e);
    }
  }
}

export function handlePagenation(datas, currentPage, itemsPerPage) {
  const page = Math.max(1, currentPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsOnPage = datas.slice(startIndex, endIndex);

  return itemsOnPage;
}

//이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
export const validateEmail = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
