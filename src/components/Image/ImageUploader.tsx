import { FC } from 'react';
import { queryClient } from 'index';
import Compressor from 'compressorjs';
// import { useImgSelectContext } from 'contexts/imgSelectContext';
import { useProject } from 'hooks/useProject';
import { useSetImage } from 'hooks/useSetImage';
import { useInitImages } from 'hooks/useInitImages';
import { generateUuid } from 'services/functions';
import { ImFilePicture } from 'react-icons/im';
import { keyItems } from 'constants/my-queries';

// if new or edit contents -> mode isSetter
// else if image manager -> mode off
const ImageUploader: FC<{ isSetter?: boolean }> = ({ isSetter }) => {
  const project = useProject();
  const setImage = useSetImage();
  const initImages = useInitImages();
  const {imagesAll} = keyItems;

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file: File = e.target.files[0];
    if (file === null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    await submitImage(file, encodeURI(file.name));
  }

  const submitImage = async (image: File, fileName: string) => {
    console.log('submitImage!!');
    if (!image || !fileName) {
      console.log('no image');
      return;
    }

    const lastFileName = fileName === 'iamge.jpg' ? generateUuid() : fileName;
  
    new Compressor(image, {
      quality: 0.8,
      maxWidth: 1600,
      success(result: Blob): void {
        // console.log('image', image);
        console.log('result', result);
        const data = new FormData();
        data.append('file', result, lastFileName);
        data.append('project', project);
        console.log('data', data.get('file'));
        const options = {
          method: 'POST',
          body: data,
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // },
        }
        // delete options.headers['Content-Type'];
        fetch(`${process.env.REACT_APP_API_URL}/images/upload`, options).then(() => {
          console.log('upload success');
        }).then(() => {
          isSetter
            ? setImage(`/images/${project}/${lastFileName}`)
            : initImages(); // store のデータをクリア
        }).then(() => {
          queryClient.removeQueries([imagesAll, project]); // 画像一覧のキャッシュ削除
        });
      },
      error(err: Error): void {
        console.log(err.message);
      },
    });
  }

  return (
    <label
      htmlFor='upload-image'
      className='for-upload-image-icon'
      data-tooltip='upload a new image&#13;&#10;新規画像アップロード'
    >
      <input id='upload-image' type="file" name='select' accept="image/*" onChange={imageHandler} />
      <ImFilePicture size={28} color={'#666'} />
      {!isSetter && <div className='for-upload-image-text'>画像をアップロード</div>}
    </label>
  );
}

export default ImageUploader;

