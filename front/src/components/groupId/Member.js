import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Api from '../../api';
import { useSelector } from 'react-redux';
import { seoulDistricts } from '../common/exportData';
import styles from './index.module.scss';
import { GroupIdContext } from '../../containers/groupId';
import { useRecoilState } from 'recoil';
import { errorMessageState, isErrorState } from '../../features/recoilState';
import { handlePagenation } from '../../utils/pagenation';
import Pagination from '../common/Pagenation';

const GroupMember = ({ view }) => {
  const [, setIsError] = useRecoilState(isErrorState);
  const [, setErrorMessage] = useRecoilState(errorMessageState);
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  const { groupId } = useParams();

  const { isMember } = useContext(GroupIdContext);

  const user = useSelector((state) => state.user);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const adminValue = searchParams.get('admin');
  const isGroupAdmin = parseInt(adminValue) === user.loginId;

  const navigator = useNavigate();

  const itemsPerPage = 18;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = handlePagenation(datas, currentPage, itemsPerPage);

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleGroupDelete = async () => {
    try {
      await Api.delete(`/group/drop/${groupId}`);
      navigator('/network?view=group');
    } catch (err) {
      console.log('그룹 삭제 실패.', err);
    }
  };

  const handleGroupRequest = async () => {
    try {
      await Api.post(`/group/join/${groupId}`);
      setErrorMessage('가입 요청에 성공했습니다');
      setIsError(true);
    } catch (err) {
      alert(err.message ? err.message : '가입 요청 실패.');
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/${groupId}`);
        setDatas(res.data.groupUser);
      } catch (err) {
        console.log(
          '멤버 리스트 데이터를 불러오는데 실패.',
          err.response.data.message,
        );
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [groupId]);

  return (
    <div className="gContainer  gList navVh">
      <div className="titleContainer">
        <h1>멤버 리스트</h1>
        {isGroupAdmin && (
          <button className="gBtn" onClick={handleGroupDelete}>
            그룹 삭제하기
          </button>
        )}
        {!isGroupAdmin && !isMember && (
          <button className="gBtn" onClick={handleGroupRequest}>
            가입 요청하기
          </button>
        )}
      </div>
      <div className={styles.memberList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          paginatedData.map((data) => (
            <Item
              key={data.id}
              data={data.user}
              setDatas={setDatas}
              groupId={groupId}
              view={view}
              isGroupAdmin={isGroupAdmin}
            />
          ))
        )}
      </div>
      <div>
        <Pagination
          totalPages={Math.ceil(datas.length / itemsPerPage)}
          currentPage={currentPage}
          handlePage={handlePage}
        />
      </div>
    </div>
  );
};

export default GroupMember;

const Item = ({ data, isGroupAdmin, groupId, setDatas }) => {
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);

  const handleOut = async () => {
    const confirm = window.confirm(`${data.nickname}님을 추방시킬까요?`);
    if (confirm) {
      try {
        console.log(data.id);
        await Api.delete(`/group/expulse/${groupId}/${data.id}`);
        setDatas((prev) => prev.filter((datas) => data.id !== datas.id));
      } catch (err) {
        console.log('멤버 추방 실패.', err);
      }
    } else {
      console.log('멤버 추방 취소');
    }
  };
  return (
    <div className={styles.memberItem}>
      <div
        onClick={() => {
          navigator(`/users/${data.id}`);
        }}
      >
        {data.nickname}
      </div>
      <div>{data.about}</div>
      <div>{seoulDistricts[data.activity]}</div>
      {isGroupAdmin && data.id !== user.loginId && (
        <button className={styles.expulse} onClick={handleOut}>
          X
        </button>
      )}
    </div>
  );
};
