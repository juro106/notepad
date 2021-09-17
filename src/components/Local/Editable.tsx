import { ReactNode, forwardRef } from 'react';

interface EditableProps {
  className: string,
  dataText: string,
  onBlur?: (() => Promise<void>) | (() => void),
  tabIndex?: number,
  children?: ReactNode,
}

const Editable = forwardRef<HTMLDivElement, EditableProps>((
  { className, dataText, onBlur, tabIndex, children }, ref,) => (
  <div
    contentEditable={true}
    suppressContentEditableWarning={true}
    spellCheck={false}
    ref={ref}
    className={className}
    data-text={dataText}
    onBlur={onBlur}
    tabIndex={tabIndex}
  >
    {children}
  </div>
));

export default Editable;

