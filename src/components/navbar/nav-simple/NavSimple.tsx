import styled from 'styled-components';
import HomeIcon from '../../../assets/images/home.svg';
import { DefaultP } from '../../../assets/styles';
import { MAIN_COLOR_BASE } from '../../../assets/colors';

const SimpleNav = styled.nav`
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

const TestDiv = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 30%;
  background-color: #36383f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function NavSimple() {
  return (
    <SimpleNav>
      <TestDiv>
        <img alt="" src={HomeIcon} width="100%" height="auto" />
      </TestDiv>
    </SimpleNav>
  );
}
