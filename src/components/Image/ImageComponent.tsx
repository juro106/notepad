import { FC } from 'react';

const ImageComponent: FC<{ imgURL: string | undefined; DeleteImage: () => void; }> = ({ imgURL, DeleteImage }) => {

  return (
    <div id="img-preview-box">
      <img
        id='preview'
        src={imgURL}
        alt={imgURL}
        title={imgURL}
        width={imgURL ? undefined : 0}
        height={imgURL ? undefined : 0}
      />
      {imgURL && <div className='delete-img-button' onClick={DeleteImage}>☓</div>}
    </div>
  );
}

export default ImageComponent;

