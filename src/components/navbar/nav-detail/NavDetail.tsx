import styled from 'styled-components';
import { DefaultBoldP } from '../../../assets/styles';
import { MAIN_COLOR_DARK } from '../../../assets/colors';

const DetailNav = styled.nav`
  background-color: ${MAIN_COLOR_DARK};
  padding: 0.5rem 1rem;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export default function NavDetail() {
  const tmpString: string = 'This is nav detail';

  return (
    <DetailNav>
      <DefaultBoldP>{tmpString}</DefaultBoldP>
    </DetailNav>
  );
}
