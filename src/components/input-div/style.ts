import styled from 'styled-components';
import {
  TEXT_FIELD_COLOR,
  TEXT_FIELD_DISABLED_COLOR,
} from '../../assets/colors';

interface CustomInputDivProps {
  backgroundColor: string;
}

export const CustomInputDiv = styled.div`
  height: auto;
  background-color: ${(props: CustomInputDivProps) =>
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
  word-wrap: break-word;
  word-break: break-word;

  &:focus {
    background-color: ${TEXT_FIELD_COLOR};
  }
`;
