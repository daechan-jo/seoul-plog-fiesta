const initialData = {
  gangnam: 0,
  gangdong: 0,
  gangbuk: 0,
  gangseo: 0,
  gwanak: 0,
  gwangjin: 0,
  guro: 0,
  geumcheon: 0,
  nowon: 0,
  dobong: 0,
  dongdaemun: 0,
  dongjak: 0,
  mapo: 0,
  seodaemun: 0,
  seocho: 0,
  seongdong: 0,
  seongbuk: 0,
  songpa: 0,
  yangcheon: 0,
  yeongdeungpo: 0,
  yongsan: 0,
  eunpyeong: 0,
  jongno: 0,
  jung: 0,
  jungnang: 0,
};

/*
{
  "gangdong": 1,
  "dongdaemun": 1
}
*/

export const handleMapData = (data) => {
  const sendData = {};

  for (const key in initialData) {
    if (data.hasOwnProperty(key)) {
      sendData[key] = data[key]; // 있으면 해당 숫자로 변경
    } else {
      sendData[key] = 0; //없으면 0으로 지역구 추가
    }
  }

  // 이상한 속성이 있으면 삭제
  for (const key in data) {
    if (!initialData.hasOwnProperty(key)) {
      delete sendData[key];
    }
  }

  return sendData;
};
