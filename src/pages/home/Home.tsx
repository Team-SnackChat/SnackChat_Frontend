import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Navbar } from '../../components/navbar';
import { SideInfo } from '../../components/side-info';
import { HomeContentsText } from '../../components/home-contents';
import { MAIN_COLOR_BASE } from '../../assets/colors';
import { RootStateType } from '../../store/configureStore';
import { parseToken } from '../../services/snackchat-api';

const HomeDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MAIN_COLOR_BASE};
  display: flex;
  flex-direction: row; ;
`;

export default function Home() {
  const accessTokenLog = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
  );
  const refreshTokenLog = useSelector(
    (state: RootStateType) => state.getToken.refreshToken,
  );

  useEffect(() => {
    console.log(parseToken(accessTokenLog));
    console.log(parseToken(refreshTokenLog));
  }, [accessTokenLog, refreshTokenLog]);
  return (
    <HomeDiv>
      <Navbar />
      <HomeContentsText />
      <SideInfo />
    </HomeDiv>
  );
}
