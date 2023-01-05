import styled from 'styled-components';
import { ChangeEvent } from 'react';
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
  const { content, setContent, onInput, $contentEditable } =
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

  return (
    <CustomInputDiv
      contentEditable
      suppressContentEditableWarning
      ref={$contentEditable}
      onInput={handleCustomDivInputChange}
      backgroundColor={backgroundColor}
    />
  );
}
