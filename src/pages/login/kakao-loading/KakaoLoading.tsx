import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import store, { RootStateType } from '../../../store/configureStore';
import { asyncGetToken } from '../../../store/reducers/getTokenReducer';
import { MAIN_COLOR_BASE } from '../../../assets/colors';
import { LoadingContents } from '../../../components/loading-contents';

const KakaoLoadingDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MAIN_COLOR_BASE};
`;

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
