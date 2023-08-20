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
