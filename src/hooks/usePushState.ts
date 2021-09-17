import { useEffect } from 'react';

export const usePushState = (closeFunc: () => void, flg?: boolean): void => {
  // モーダルが開いたときなど、強制的に1つ履歴を作ってブラウザバックで閉じれるようにする
  useEffect(() => {
    // モーダルが呼ばれたときに初めて pushState する。
    if (flg) {
      // window.history.pushState(null, "", null);
      window.addEventListener('popstate',
        (event: PopStateEvent) => {
          event.preventDefault();
          window.history.go(1);
          // window.history.pushState(null, "", null);
          // window.history.go(-3);
          closeFunc();
        },
        { once: true });
    }
  }, [flg, closeFunc])
}

