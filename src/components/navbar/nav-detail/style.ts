import styled from 'styled-components';
import {
  MAIN_COLOR_BASE,
  MAIN_COLOR_DARK,
  THEME_DARK_COLOR,
} from '../../../assets/colors';
import { DefaultP } from '../../../assets/styles';

export const DetailNav = styled.nav`
  background-color: ${MAIN_COLOR_DARK};
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ServerNameDiv = styled.div`
  margin: 1rem;
  display: flex;
  align-items: center;
`;

export const ChatListNav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.hr`
  height: 0.2rem;
  width: 100%;
  background-color: #3d3d40;
  margin: 0 0 1rem 0;
  border: 0;
`;

export const UserProfileWrapper = styled.div`
  display: flex;
  padding: 0.8rem;
  background-color: ${MAIN_COLOR_BASE};
`;

export const UserProfileContainer = styled.div`
  width: 70%;
  padding: 0.3rem 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  background-color: ${MAIN_COLOR_BASE};

  &:hover {
    cursor: pointer;
    background-color: #393940;
  }
`;

export const ProfilePicture = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserName = styled(DefaultP)`
  font-weight: bold;
`;

interface ChatRoomDivProps {
  isSelected: boolean;
}

export const ChatRoomDiv = styled.div<ChatRoomDivProps>`
  margin: 0.5rem;
  border-radius: 1rem;
  padding: 0.4rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? THEME_DARK_COLOR : MAIN_COLOR_DARK};

  &:hover {
    background-color: ${THEME_DARK_COLOR};
  }
`;

export const SettingDiv = styled.div`
  height: 80%;

  &:hover {
    transform: scale(1.1);
  }
`;
