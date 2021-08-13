import { FC, useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const About: FC = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle('About');
  },[]);
  
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="メモ帳アプリの使い方。" />
      </Helmet>
      <div className="fixed-content">
        <h1 id='page-title'>About</h1>
        <p>これはメモ帳アプリです。</p>
        <h2>使い方</h2>
        <h3>新規投稿 </h3>
        <p>画面上部のメニューの「New」または画面右下の「＋」をタップ（クリック）</p>
        <h3>編集</h3>
        <p>本文をタップすれば編集出来ます。</p>
      </div>
    </HelmetProvider>
  );
}

export default About;
