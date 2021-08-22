import { FC } from 'react';
import { queryClient } from 'index';
import Compressor from 'compressorjs';
// import { useImgSelectContext } from 'contexts/imgSelectContext';
import { useProject } from 'hooks/useProject';
import { useImageSetter } from 'hooks/useImageSetter';
import { ImFilePicture } from 'react-icons/im';

// if new or edit contents -> mode isSetter
// else if image manager -> mode off
const ImageUploader: FC<{ isSetter?: boolean, changeState?: (arg: boolean) => void }> = ({ isSetter, changeState }) => {
  const project = useProject();
  const imageSetter = useImageSetter();

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
    new Compressor(image, {
      quality: 0.8,
      maxWidth: 1600,
      success(result: Blob): void {
        // console.log('image', image);
        console.log('result', result);
        const data = new FormData();
        data.append('file', result, fileName);
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
            ? imageSetter(`/images/${project}/${fileName}`)
            : changeState && changeState(true); // 全体の画像を更新する
        }).then(() => {
          queryClient.removeQueries(['images-all', project]); // 画像一覧のキャッシュ削除
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

