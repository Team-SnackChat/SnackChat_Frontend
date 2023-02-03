import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DefaultP, DefaultPCustom, DefaultBoldP } from '../../../assets/styles';
import { MAIN_COLOR_BASE, MAIN_COLOR_DARK } from '../../../assets/colors';
import { RootStateType } from '../../../store/configureStore';
import { parseToken } from '../../../services/snackchat-api/getToken';
import UserDefaultProfile from '../../../assets/images/user_default_profile.svg';

const DetailNav = styled.nav`
  background-color: ${MAIN_COLOR_DARK};
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserProfileWrapper = styled.div`
  display: flex;
  padding: 0.8rem;
  background-color: ${MAIN_COLOR_BASE};
`;

const UserProfileContainer = styled.div`
  width: 70%;
  padding: 0.3rem 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  background-color: ${MAIN_COLOR_BASE};

  &:hover {
    cursor: pointer;
    background-color: #393940;
  }
`;

const ProfilePicture = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled(DefaultP)`
  font-weight: bold;
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
      <UserProfileWrapper>
        <UserProfileContainer>
          <ProfilePicture src={UserDefaultProfile} alt="profile" />
          <UserName>{userName}</UserName>
          <DefaultPCustom fontColor="#d3d3d3" fontSize={0.5}>
            #{userTag}
          </DefaultPCustom>
        </UserProfileContainer>
      </UserProfileWrapper>
    </DetailNav>
  );
}
