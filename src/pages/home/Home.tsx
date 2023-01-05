import styled from 'styled-components';
import { Navbar } from '../../components/navbar';
import { SideInfo } from '../../components/side-info';
import { HomeContentsText } from '../../components/home-contents';
import { MAIN_COLOR_BASE } from '../../assets/colors';

const HomeDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MAIN_COLOR_BASE};
  display: flex;
  flex-direction: row; ;
`;

export default function Home() {
  return (
    <HomeDiv>
      <Navbar />
      <HomeContentsText />
      <SideInfo />
    </HomeDiv>
  );
}
