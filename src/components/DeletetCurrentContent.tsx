import { FC, useContext, useRef, useState, useEffect } from 'react';
import deleteContent from 'services/delete-content';
import ToastWarning from 'components/ToastWarning';

type Props = {
  title: string;
  project: string;
  slug: string;
}

const DeleteCurrentContent: FC<Props> = ({ project, slug, title }) => {

  

  return (
    <>
    </>
  ); 
}

export default DeleteCurrentContent;
