import { FC, useEffect } from 'react';

const TestGetTags: FC = () => {

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tags/public`);
      console.log(res.json());
    }
    fetchData();
  },[])
 
  return (
    <h1>タグ一覧取得のテスト</h1>
  )
}

export default TestGetTags;
