import {
  FC,
  FormEvent,
  useState,
  useEffect,
  useRef,
} from 'react';

const ContentEditable: FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState('');

  useEffect(() => {

  }, [html])

  const onInput = (e: FormEvent<HTMLDivElement>) => {
    const currentHTML = e.currentTarget.innerHTML;
    setHtml(currentHTML);
  }

  return (
    <div className='wrapper'>
      <main>
        <div className='content-body'
          ref={editorRef}
          contentEditable={true}
          onInput={onInput}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </div>
  );
}

export default ContentEditable;
