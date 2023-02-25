import styled from 'styled-components';
import { MAIN_COLOR_BASE, THEME_COLOR } from '../../../assets/colors';

export const SimpleNav = styled.nav`
  background-color: ${MAIN_COLOR_BASE};
  padding: 0.75rem 1rem;
  border-width: 0;
  border-right-width: 0.25rem;
  border-style: solid;
  border-image: linear-gradient(
      to bottom,
      rgba(233, 168, 84, 1),
      rgba(20, 20, 21, 1)
    )
    1 100%;
  min-width: 3rem;
  width: 3rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Divider = styled.hr`
  width: 2.5rem;
  border-top: 0.1rem solid #bbb;
`;

export interface ServerProfileDivProps {
  serverId: number;
  selectedServerId: number;
}

export const ServerProfileDiv = styled.div<ServerProfileDivProps>`
  width: 3rem;
  height: 3rem;
  border: ${(props) =>
    props.serverId === props.selectedServerId
      ? `0.2rem solid ${THEME_COLOR}`
      : 'none'};
  border-radius: 30%;
  background-color: #36383f;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
