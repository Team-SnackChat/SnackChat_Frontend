import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DefaultP, DefaultPCustom, DefaultBoldP } from '../../../assets/styles';
import { MAIN_COLOR_BASE, MAIN_COLOR_DARK } from '../../../assets/colors';
import { RootStateType } from '../../../store/configureStore';
import { parseToken } from '../../../services/snackchat-api';

const DetailNav = styled.nav`
  background-color: ${MAIN_COLOR_DARK};
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserProfileDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  height: 3rem;
  background-color: ${MAIN_COLOR_BASE};
`;

export default function NavDetail() {
  const accessTokenLog = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
  );
  const accessToken = parseToken(accessTokenLog);
  const [userName, userTag] = accessToken.nickname.split('#');
  const tmpString: string = 'This is nav detail';

  return (
    <DetailNav>
      <DefaultBoldP>{tmpString}</DefaultBoldP>
      <UserProfileDiv>
        <DefaultP>{userName}</DefaultP>
        <DefaultPCustom fontColor="#ffffff" fontSize={0.5}>
          #{userTag}
        </DefaultPCustom>
      </UserProfileDiv>
    </DetailNav>
  );
}
