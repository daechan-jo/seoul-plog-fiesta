const Info = ({ data }) => {
  return (
    <div className={`gContainer`}>
      <div className="titleContainer">
        <h1>내 정보</h1>
      </div>
      <ul>
        <div>
          <img
            src={data?.imgUrl || 'http://placekitten.com/200/200'}
            alt="profile"
          />
        </div>
        <li>
          <label>이메일</label>
          <div>{data.email}</div>
        </li>
        <li>
          <label>이름</label>
          <div>{data.name}</div>
        </li>
        <li>
          <label>별명</label>
          <div>{data.nickname}</div>
        </li>
        <li>
          <label>소개</label>
          <div>{data.about}</div>
        </li>
        <li>
          <label>지역구</label>
          <div>강동구</div>
        </li>
      </ul>
      <div></div>
    </div>
  );
};

export default Info;
