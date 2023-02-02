import styled from 'styled-components';
import { ChangeEvent, KeyboardEvent } from 'react';
import { useEditableDiv } from '../../hooks';
import {
  TEXT_FIELD_COLOR,
  TEXT_FIELD_DISABLED_COLOR,
} from '../../assets/colors';

interface InputDivProps {
  backgroundColor: string;
}

const CustomInputDiv = styled.div`
  height: auto;
  background-color: ${(props: InputDivProps) =>
    props.backgroundColor || TEXT_FIELD_DISABLED_COLOR};
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.5rem;
  outline: none;
  resize: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: normal;
  color: white;
  display: flex;
  align-items: center;

  &:focus {
    background-color: ${TEXT_FIELD_COLOR};
  }
`;

export default function InputDiv({ backgroundColor }: InputDivProps) {
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
        console.log('---------');
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
