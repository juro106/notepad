import { FC, useContext, useState, useEffect } from 'react';
import {CharacterCounterContext, useCharacterCounterContext} from 'contexts/characterCounterContext';

const Save: FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const ctx = useCharacterCounterContext();
  const { isPostable } = useContext(CharacterCounterContext);
  console.log('save-isPostable', isPostable);

  useEffect(() => {
    setActive(isPostable);
  },[isPostable]) 
  
  return (
    <div className="button-save-box">
      <div role='button' className={active ? 'save_isActive' : 'save_isNotActive'} onClick={() => ctx.setPushedState(true)}>save</div>
    </div>
  )

}

export default Save;

