import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const useSetMeta = (title: string, slug: string): void => { 
  const location = useLocation();

  useEffect(() => {
    document.title = title;
    const head = document.getElementsByTagName('head')[0];
    const links = document.getElementsByTagName('link');
    const elem = Array.from(links);
    let flg = false;
    elem.forEach(link => {
      if (link && link.rel === 'canonical') {
        link.href = `${process.env.REACT_APP_BASE_URL}/${slug}`;
        flg = true;
      }
    });
    if (!flg) {
      const newLink = document.createElement('link');
      newLink.rel = 'canonical';
      newLink.href = `${process.env.REACT_APP_BASE_URL}/${slug}`;
      head.appendChild(newLink);
    }

  }, [location, title, slug]);
}
