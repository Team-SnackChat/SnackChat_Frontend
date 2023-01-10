import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { DefaultP } from '../../../assets/styles';
import { MAIN_COLOR_BASE } from '../../../assets/colors';
import { postAuthorizationCode } from '../../../services/snackchat-api';

const KakaoLoadingDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MAIN_COLOR_BASE};
`;

const handleTest = async (code: string) => {
  const data = await postAuthorizationCode({ authorizationCode: code });
  console.log(data);
};

export default function KakaoLoading() {
  const location = useLocation();
  const KAKAO_AUTHORIZATION_CODE = location.search.split('=')[1];
  const tmp = '카카오 로딩을 기다리는 중입니다';
  return (
    <KakaoLoadingDiv>
      <DefaultP>{tmp}</DefaultP>
      <Button onClick={() => handleTest(KAKAO_AUTHORIZATION_CODE)}>
        테스트
      </Button>
    </KakaoLoadingDiv>
  );
}
