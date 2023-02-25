import styled from 'styled-components';
import {
  LOGIN_THEME_COLOR,
  MAIN_COLOR_BASE,
  THEME_DARK_COLOR,
} from '../../assets/colors';
import { DefaultBoldP, DefaultP } from '../../assets/styles';

export const LoginButton = styled.button`
  width: 20rem;
  background-color: ${THEME_DARK_COLOR};
  border: 0;
  border-radius: 1rem;
  padding: 0.5rem 0;

  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

export const LoginContent = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28rem;
  height: 16rem;
  border-radius: 1rem;
  background-color: ${LOGIN_THEME_COLOR};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const LoginDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MAIN_COLOR_BASE};
`;

export const LoginInfoDiv = styled.div`
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const LoginTitleTypo = styled(DefaultBoldP)`
  font-size: 1.6rem;
`;

export const LoginMainTypo = styled(DefaultP)`
  font-size: 0.8rem;
  color: #b4b6ba;
`;
