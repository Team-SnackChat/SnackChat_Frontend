import { ChangeEvent, KeyboardEvent } from 'react';
import { useEditableDiv } from '../../hooks';
import { CustomInputDiv } from './style';

interface InputDivProps {
  backgroundColor: string;
  messageSendCallback: any;
}

export default function InputDiv({
  backgroundColor,
  messageSendCallback,
}: InputDivProps) {
  const { content, onInput, $contentEditable, resetContent } =
    useEditableDiv(null);

  const handleResizeChange = () => {
    if ($contentEditable.current) {
      $contentEditable.current.style.height = 'auto';
      $contentEditable.current.style.height = `${
        $contentEditable.current.scrollHeight / 16
      }rem`;
    }
  };

  const handleCustomDivInputChange = (event: ChangeEvent<HTMLDivElement>) => {
    onInput(event);
    handleResizeChange();
  };

  const handleCustomDivKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      if (content?.innerText) {
        messageSendCallback(content.innerText);
      }
      event.preventDefault();
      resetContent();
      if ($contentEditable.current) {
        $contentEditable.current.style.height = 'auto';
      }
    }
  };

  const handleCustomDivBlur = () => {
    if ($contentEditable.current) {
      $contentEditable.current.style.height = 'auto';
    }
  };

  return (
    <CustomInputDiv
      contentEditable
      suppressContentEditableWarning
      ref={$contentEditable}
      onInput={handleCustomDivInputChange}
      onKeyPress={handleCustomDivKeyPress}
      onBlur={handleCustomDivBlur}
      backgroundColor={backgroundColor}
    />
  );
}
