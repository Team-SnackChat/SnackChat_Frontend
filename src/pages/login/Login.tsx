import styled from 'styled-components';
import { DefaultP, DefaultBoldP } from '../../assets/styles';
import {
  MAIN_COLOR_BASE,
  LOGIN_THEME_COLOR,
  THEME_DARK_COLOR,
} from '../../assets/colors';

const LoginButton = styled.button`
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

const LoginContent = styled.section`
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

const LoginDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MAIN_COLOR_BASE};
`;

const LoginInfoDiv = styled.div`
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const LoginTitleTypo = styled(DefaultBoldP)`
  font-size: 1.6rem;
`;

const LoginMainTypo = styled(DefaultP)`
  font-size: 0.8rem;
  color: #b4b6ba;
`;

export default function Login() {
  return (
    <LoginDiv>
      <LoginContent>
        <LoginInfoDiv>
          <LoginTitleTypo>만나서 반갑습니다!</LoginTitleTypo>
          <LoginMainTypo>소셜로그인을 이용해주세요</LoginMainTypo>
        </LoginInfoDiv>
        <LoginButton>
          <DefaultBoldP>카카오 로그인</DefaultBoldP>
        </LoginButton>
      </LoginContent>
    </LoginDiv>
  );
}
