export function handleImgChange(e) {
	const img = e.target.files[0];

	if (!img) {
		alert('JPG 확장자의 이미지 파일을 넣어주세요.');
		return;
	} else if (img.type !== 'image/jpeg' && img.type !== 'images/jpg') {
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

//이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
export const validateEmail = (email) => {
	return email
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		);
};
