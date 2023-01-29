import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import store, { RootStateType } from '../../../store/configureStore';
import { asyncGetToken } from '../../../store/reducers/getTokenReducer';
import { MAIN_COLOR_BASE } from '../../../assets/colors';
import { LoadingContents } from '../../../components/loading-contents';
import { parseToken } from '../../../services/snackchat-api';

const KakaoLoadingDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MAIN_COLOR_BASE};
`;
// const COOKIE_TEST_URL = process.env.REACT_APP_COOKIE_TEST_URL;
// const testInstance = axios.create({
//   baseURL: 'https://carrotww.shop',
//   withCredentials: true,
// });

// const handleTest = async (code: string) => {
//   if (COOKIE_TEST_URL) {
//     const response = await testInstance.get('/users/test/');
//     console.dir(response);
//   }
// };

export default function KakaoLoading() {
  const navigate = useNavigate();
  const location = useLocation();
  const KAKAO_AUTHORIZATION_CODE = location.search.split('=')[1];

  const accessTokenLog = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
  );

  useEffect(() => {
    const asyncGetTokenWrapper = async () => {
      await store.dispatch(asyncGetToken(KAKAO_AUTHORIZATION_CODE));
    };

    if (accessTokenLog) {
      navigate('/home');
    } else {
      asyncGetTokenWrapper().then(() => {});
    }
  }, [KAKAO_AUTHORIZATION_CODE, navigate, accessTokenLog]);

  return (
    <KakaoLoadingDiv>
      <LoadingContents />
    </KakaoLoadingDiv>
  );
}
