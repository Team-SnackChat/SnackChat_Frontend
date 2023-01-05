import styled from 'styled-components';
import {
  MAIN_COLOR_BASE,
  TEXT_FIELD_DISABLED_COLOR,
} from '../../../assets/colors';
import { InputDiv } from '../../input-div';

const ContentsTextDiv = styled.div`
  background-color: ${MAIN_COLOR_BASE};
  padding: 0.5rem 1rem;
  width: 100%;
  height: auto;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 1.5rem 1rem;
`;

const ChatLogSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${MAIN_COLOR_BASE};
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: normal;
  color: white;
`;

export default function HomeContentsText() {
  return (
    <ContentsTextDiv>
      <ChatLogSection>Chat log</ChatLogSection>
      <InputDiv backgroundColor={TEXT_FIELD_DISABLED_COLOR} />
    </ContentsTextDiv>
  );
}
