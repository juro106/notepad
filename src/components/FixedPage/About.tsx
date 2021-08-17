import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const About: FC = () => {

  return (
    <>
      <Helmet>
        <title>About</title>
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
    </>
  );
}

export default About;
