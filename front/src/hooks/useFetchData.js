import { useEffect, useState } from 'react';
import Api from '../api';

// 페이지네이션의 유무에 따른 데이터 설정은 컴포넌트에서함 => hook은 데이터를 받아와서 반환값만 가져갈 수 있게함
// 단, 현재는 받는 데이터 모양이 모두 달라서 사용 불가능함
const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  // setIsFeting은 useEffect 안에서만 사용하니까 반환안함
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const res = await Api.get(endpoint);
        setData(res.data.posts);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        setError(err.response.data.message); // 에러메시지를 바로 error state로 담아서 사용(alert);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [endpoint]);

  // 해당 컴포넌트에서 map할 data, 페이지네이션에 넘겨줄 totalPages, 로딩중을 띄울 isFetching, 에러시 메시지만 출력할 error
  return { data, totalPages, isFetching, error };
};

export default useFetchData;