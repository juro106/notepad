import { FC, useState, useContext, createContext } from 'react';

const ToastContext = createContext({
  showToast: (message: string) => {}
});

export const ToastProvider: FC = (props) => {
  const [state, update] = useState({
    show: false,
    message: '',
  });

  const showToast = (message: string) => {
    update({ show: true, message });
    setTimeout(() => update({ ...state, show: false, message: '' }), 300);
  }

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        {props.children}
      </ToastContext.Provider>
      <div className='toast-contents-update'>
        {state.message}
      </div>
    </>
  );
}

export const useToast = () => useContext(ToastContext);

