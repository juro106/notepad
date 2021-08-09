import { FC, useContext } from 'react';
import Compressor from 'compressorjs';
import { ProjectContext } from 'contexts/projectContext';

// const Image: FC<{ setImageURL: (arg: string) => void, url?: string }> = ({ setImageURL, url }) => {
const ImageUploader: FC<{changeState: (arg: boolean) => void}> = ({changeState}) => {
  const { project } = useContext(ProjectContext);

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file: File = e.target.files[0];
    if (file === null) {
      return;
    }
    // const imgTag = document.getElementById('preview') as HTMLImageElement;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onload = () => {
    //   const result: string = reader.result as string;
    //   imgTag.src = result;
    // }
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
      maxWidth: 800,
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
          // setImageURL(`/images/${project}/${fileName}`);
          changeState(true);
        });
      },
      error(err: Error): void {
        console.log(err.message);
      },
    });
  }

  return (
    <label htmlFor='upload-img' className='for-upload-img'>
      <input id='upload-img' type="file" name='select' accept="image/*" onChange={imageHandler} />
      upload new image
    </label>
  );
}

export default ImageUploader;

