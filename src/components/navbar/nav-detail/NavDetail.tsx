import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DefaultP, DefaultPCustom, DefaultBoldP } from '../../../assets/styles';
import { MAIN_COLOR_BASE, MAIN_COLOR_DARK } from '../../../assets/colors';
import { RootStateType } from '../../../store/configureStore';
import { parseToken } from '../../../services/snackchat-api/getToken';
import UserDefaultProfile from '../../../assets/images/user_default_profile.svg';
import { getChatRoomList } from '../../../services/snackchat-api/getChatRoomList';

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
  const [chatRoomList, setChatRoomList] = useState<Array<any>>([]);
  const accessToken = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
  );
  const selectedServer = useSelector(
    (state: RootStateType) => state.getServerList.selectedServer,
  );
  const accessTokenPlain = parseToken(accessToken);
  const [userName, userTag] = accessTokenPlain.nickname.split('#');
  const tmpString: string = 'This is nav detail';

  useEffect(() => {
    console.log(chatRoomList);
  }, [chatRoomList]);
  useEffect(() => {
    const asyncGetChatListWrapper = async () => {
      if (accessToken && selectedServer !== -1) {
        const response = await getChatRoomList({
          token: accessToken,
          serverId: selectedServer,
        });
        setChatRoomList(response);
      }
    };
    asyncGetChatListWrapper().then(() => {});
  }, [selectedServer]);
  return (
    <DetailNav>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {chatRoomList ? (
          chatRoomList.map((chatRoom: any) => (
            <div key={chatRoom.id} style={{ margin: '0.4rem 0' }}>
              <DefaultP>{chatRoom.chatroom_name}</DefaultP>
            </div>
          ))
        ) : (
          <div />
        )}
      </div>
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
