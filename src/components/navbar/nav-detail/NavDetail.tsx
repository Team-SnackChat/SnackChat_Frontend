import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DefaultPCustom,
  DefaultBoldP,
  DefaultBoldPCustom,
} from '../../../assets/styles';
import {
  COMMENT_DARK_COLOR,
  COMMENT_LIGHT_COLOR,
} from '../../../assets/colors';
import { RootStateType } from '../../../store/configureStore';
import { parseToken } from '../../../services/snackchat-api/getToken';
import UserDefaultProfile from '../../../assets/images/user_default_profile.svg';
import {
  getChatRoomList,
  GetChatRoomListResponseType,
} from '../../../services/snackchat-api/getChatRoomList';
import { selectChatRoom } from '../../../store/reducers/updateChatRoomReducer';
import { ReactComponent as SettingIcon } from '../../../assets/images/setting_gear.svg';
import {
  DetailNav,
  ChatListNav,
  ChatRoomDiv,
  SettingDiv,
  ServerNameDiv,
  UserName,
  Divider,
  UserProfileContainer,
  UserProfileWrapper,
  ProfilePicture,
} from './style';

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
  const selectedChatRoomId = useSelector(
    (state: RootStateType) => state.updateChatRoom.chatRoomId,
  );
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
          chatRoomList.map((chatRoom: GetChatRoomListResponseType) => (
            <ChatRoomDiv
              isSelected={selectedChatRoomId === chatRoom.id}
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
              <SettingDiv>
                <SettingIcon height="100%" fill="white" />
              </SettingDiv>
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
