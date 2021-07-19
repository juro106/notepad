import { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <h1>NotePad</h1>
      <div className="editable" contentEditable='true'>
        →この文章は自由に書き換えられます。←
      </div>
    </>
  );
}

export default Home;

