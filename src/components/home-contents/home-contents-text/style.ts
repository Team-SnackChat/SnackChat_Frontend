import styled from 'styled-components';
import {
  MAIN_COLOR_BASE,
  MAIN_COLOR_DARK,
  THEME_COLOR,
} from '../../../assets/colors';

export const ContentsTextDiv = styled.div`
  background-color: ${MAIN_COLOR_BASE};
  width: 100%;
  margin: 1.5rem 0;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export const ChatRoomNameDiv = styled.div`
  align-self: flex-start;
  margin-left: 1rem;
`;

export const ChatRoomBodyDiv = styled.div`
  height: 100%;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export interface ChatLogSectionProps {
  height: number;
}

export const ChatLogSection = styled.section<ChatLogSectionProps>`
  width: 100%;
  height: ${(props) => props.height}rem;
  background-color: ${MAIN_COLOR_BASE};
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export const ChatLogScrollDiv = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.3rem;
    background-color: ${MAIN_COLOR_DARK};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background-color: ${THEME_COLOR};
  }
`;

export const ChatBox = styled.article`
  width: 100%;
  min-height: 3rem;
  margin-bottom: 1.2rem;
  display: flex;

  &:hover {
    opacity: 70%;
  }
`;

export const ChatLogContainer = styled.div`
  width: 100%;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const ChatLogHeader = styled.div`
  display: flex;
  margin-bottom: 0.2rem;
`;

export interface AlertNewMessageDivProps {
  displayOption: string;
}

export const AlertNewMessageDiv = styled.div<AlertNewMessageDivProps>`
  position: fixed;
  bottom: 5rem;
  right: 4rem;
  height: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${THEME_COLOR};
  display: ${(props) => props.displayOption};

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;
