import styled from 'styled-components';
import { DefaultP } from '../../assets/styles';
import { MAIN_COLOR_DARK } from '../../assets/colors';

const SideInfoNav = styled.nav`
  background-color: ${MAIN_COLOR_DARK};
  padding: 0.5rem 1rem;
  min-width: 15rem;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export default function SideInfo() {
  const tmpString: string = 'This is side info';

  return (
    <SideInfoNav>
      <DefaultP>{tmpString}</DefaultP>
    </SideInfoNav>
  );
}
