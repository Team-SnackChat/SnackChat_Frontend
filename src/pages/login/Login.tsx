import { useEffect } from 'react';
import axios from 'axios';
import { DefaultBoldP } from '../../assets/styles';
import {
  LoginButton,
  LoginTitleTypo,
  LoginMainTypo,
  LoginDiv,
  LoginInfoDiv,
  LoginContent,
} from './style';
import {
  KAKAO_REDIRECT_URL,
  KAKAO_REST_API_KEY,
} from '../../services/snackchat-api/constants';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?
client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;

const handleClickLoginButton = () => {
  window.location.href = KAKAO_AUTH_URL;
};

const testInstance = axios.create({
  baseURL: 'https://carrotww.shop',
  withCredentials: true,
});

export default function Login() {
  useEffect(() => {
    console.log(KAKAO_REDIRECT_URL);
  }, []);
  return (
    <LoginDiv>
      <LoginContent>
        <LoginInfoDiv>
          <LoginTitleTypo>만나서 반갑습니다!</LoginTitleTypo>
          <LoginMainTypo>소셜로그인을 이용해주세요</LoginMainTypo>
        </LoginInfoDiv>
        <LoginButton onClick={handleClickLoginButton}>
          <DefaultBoldP>카카오 로그인</DefaultBoldP>
        </LoginButton>
        <LoginButton
          onClick={async () => {
            await testInstance.get('/users/test/');
          }}
        >
          <DefaultBoldP>테스트</DefaultBoldP>
        </LoginButton>
      </LoginContent>
    </LoginDiv>
  );
}
