import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  DefaultP,
  DefaultPCustom,
  DefaultBoldP,
  DefaultBoldPCustom,
} from '../../../assets/styles';
import {
  MAIN_COLOR_BASE,
  MAIN_COLOR_DARK,
  COMMENT_DARK_COLOR,
  COMMENT_LIGHT_COLOR,
} from '../../../assets/colors';
import { RootStateType } from '../../../store/configureStore';
import { parseToken } from '../../../services/snackchat-api/getToken';
import UserDefaultProfile from '../../../assets/images/user_default_profile.svg';
import { getChatRoomList } from '../../../services/snackchat-api/getChatRoomList';
import { selectChatRoom } from '../../../store/reducers/updateChatRoomReducer';

const DetailNav = styled.nav`
  background-color: ${MAIN_COLOR_DARK};
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ServerNameDiv = styled.div`
  margin: 1rem;
  display: flex;
  align-items: center;
`;

const ChatListNav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Divider = styled.hr`
  height: 0.2rem;
  width: 100%;
  background-color: #3d3d40;
  margin: 0 0 1rem 0;
  border: 0;
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

const ChatRoomDiv = styled.div`
  margin: 0.5rem;
  border-radius: 1rem;
  padding: 0.4rem 0.5rem;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #393940;
  }
`;

export default function NavDetail() {
  const [chatRoomList, setChatRoomList] = useState<Array<any>>([]);
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
  );
  const { serverId, serverName } = useSelector((state: RootStateType) => ({
    serverId: state.getServerList.selectedServerId,
    serverName: state.getServerList.selectedServerName,
  }));
  const accessTokenPlain = parseToken(accessToken);
  const [userName, userTag] = accessTokenPlain.nickname.split('#');

  useEffect(() => {
    const asyncGetChatListWrapper = async () => {
      if (accessToken && serverId !== -1) {
        const response = await getChatRoomList({
          token: accessToken,
          serverId,
        });
        setChatRoomList(response);
        if (response.length > 0) {
          dispatch(
            selectChatRoom({
              chatRoomId: response[0].id,
              chatRoomName: response[0].chatroom_name,
            }),
          );
        }
      }
    };
    asyncGetChatListWrapper().then(() => {});
  }, [serverId, accessToken]);
  return (
    <DetailNav>
      <ServerNameDiv>
        <DefaultBoldP>{serverName}</DefaultBoldP>
      </ServerNameDiv>
      <Divider />
      <ChatListNav>
        <DefaultBoldPCustom
          fontColor={COMMENT_LIGHT_COLOR}
          fontSize={0.8}
          style={{ margin: '0 1rem' }}
        >
          채팅채널
        </DefaultBoldPCustom>
        {chatRoomList ? (
          chatRoomList.map((chatRoom: any) => (
            <ChatRoomDiv
              key={chatRoom.id}
              onClick={() => {
                dispatch(
                  selectChatRoom({
                    chatRoomId: chatRoom.id,
                    chatRoomName: chatRoom.chatroom_name,
                  }),
                );
              }}
            >
              <DefaultPCustom fontColor={COMMENT_LIGHT_COLOR} fontSize={1}>
                🍪 {chatRoom.chatroom_name}
              </DefaultPCustom>
            </ChatRoomDiv>
          ))
        ) : (
          <div />
        )}
      </ChatListNav>
      <UserProfileWrapper>
        <UserProfileContainer>
          <ProfilePicture src={UserDefaultProfile} alt="profile" />
          <UserName>{userName}</UserName>
          <DefaultPCustom fontColor={COMMENT_DARK_COLOR} fontSize={0.5}>
            #{userTag}
          </DefaultPCustom>
        </UserProfileContainer>
      </UserProfileWrapper>
    </DetailNav>
  );
}
