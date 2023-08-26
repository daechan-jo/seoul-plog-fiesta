import { useState } from 'react';
import { seoulDistricts } from './exportData';
import styles from './index.module.scss';

const Plogging = ({ setIsWriting }) => {
	const [formData, setFormData] = useState({
		region: '',
		location: '',
		distance: '',
		trashAmount: '',
		averagePace: '',
		description: '',
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleImgChange = (e) => {
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
					const previewImg = document.getElementById('proggingPreviewImg');
					previewImg.src = reader.result;
				};

				reader.readAsDataURL(img);
			} catch (e) {
				alert(e);
			}
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// 폼 데이터를 이용하여 API 호출 또는 다른 작업 수행
		console.log(formData);
	};

	return (
		<div className="modal">
			<form className={styles.plogging} onSubmit={handleSubmit}>
				<h1>인증하기</h1>
				<div className="container">
					<div className="img">
						<div className={styles.imgContainer}>
							<img id="proggingPreviewImg" alt="인증이미지" />
						</div>
						<input type="file" name="file" onChange={handleImgChange} />
					</div>
					<div className={styles.content}>
						<label>장소</label>
						<div>
							<select
								name="region"
								value={formData.region}
								onChange={handleInputChange}
							>
								<option value="">자치구 선택</option>
								{Object.keys(seoulDistricts).map((region) => (
									<option key={region} value={region}>
										{seoulDistricts[region]}
									</option>
								))}
							</select>
							<input />
						</div>
						<label>쓰레기 양</label>
						<input
							type="text"
							name="trashAmount"
							value={formData.trashAmount}
							onChange={handleInputChange}
						/>
						<label>거리(km)</label>
						<input
							type="text"
							name="distance"
							value={formData.distance}
							onChange={handleInputChange}
						/>
						<label>평균 페이스</label>
						<input
							type="text"
							name="averagePace"
							value={formData.averagePace}
							onChange={handleInputChange}
						/>
						<label>설명</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className={styles.btns}>
					<button className="gBtn" type="submit">
						인증하기
					</button>
					<button
						type="button"
						onClick={() => {
							setIsWriting(false);
						}}
						className={styles.back}
					>
						뒤로가기
					</button>
				</div>
			</form>
		</div>
	);
};

export default Plogging;
