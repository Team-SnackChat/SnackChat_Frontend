import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootStateType } from '../../../store/configureStore';
import {
  MAIN_COLOR_BASE,
  TEXT_FIELD_DISABLED_COLOR,
  COMMENT_LIGHT_COLOR,
  COMMENT_DARK_COLOR,
} from '../../../assets/colors';
import { DefaultBoldP, DefaultPCustom } from '../../../assets/styles';
import UserDefaultProfile from '../../../assets/images/user_default_profile.svg';
import { InputDiv } from '../../input-div';
import { getChatRoomLogList } from '../../../services/snackchat-api/getChatRoomLogList';

const SNACKCHAT_API_URL = process.env.REACT_APP_SNACKCHAT_API_URL;

const ContentsTextDiv = styled.div`
  background-color: ${MAIN_COLOR_BASE};
  padding: 0.5rem 1rem;
  width: 100%;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 1.5rem 0.3rem;
`;

const ChatLogSection = styled.section`
  width: 100%;
  background-color: ${MAIN_COLOR_BASE};
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const ChatBox = styled.article`
  width: 100%;
  min-height: 3rem;
  margin-bottom: 1.2rem;
  display: flex;

  &:hover {
    opacity: 70%;
  }
`;

const ChatLogContainer = styled.div`
  width: 100%;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const ChatLogHeader = styled.div`
  display: flex;
  margin-bottom: 0.2rem;
`;

export default function HomeContentsText() {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [chatLogList, setChatLogList] = useState<Array<any>>([]);
  const [arrivalChat, setArrivalChat] = useState<Object>({});
  const chatRoomId = useSelector(
    (state: RootStateType) => state.updateChatRoom.chatRoomId,
  );
  const chatRoomName = useSelector(
    (state: RootStateType) => state.updateChatRoom.chatRoomName,
  );
  const accessToken = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
  );
  const parseToken = useSelector(
    (state: RootStateType) => state.getToken.parseToken,
  );

  useEffect(() => {
    arrivalChat && setChatLogList((prev) => [...prev, arrivalChat]);
  }, [arrivalChat]);

  useEffect(() => {
    if (webSocket) {
      webSocket.onmessage = (e) => {
        setArrivalChat(JSON.parse(e.data));
      };
    }
  }, [webSocket]);

  useEffect(() => {
    const asyncGetChatRoomLogListWrapper = async () => {
      if (accessToken && chatRoomId >= 0) {
        const response = await getChatRoomLogList({
          token: accessToken,
          chatRoomId,
        });
        console.dir(response);
        setChatLogList(response);
      }
    };
    asyncGetChatRoomLogListWrapper().then(() => {});
  }, [accessToken, chatRoomId]);

  useEffect(() => {
    if (webSocket) {
      webSocket.close();
    }
    let socket: WebSocket | null = null;
    if (chatRoomId >= 0) {
      socket = new WebSocket(`ws://carrotww.shop/chats/${chatRoomId}/`);
      setWebSocket(socket);
      socket.onopen = () => {
        console.log(`connected success with chatRoom-${chatRoomId}`);
      };
      socket.onclose = () => {
        console.error(
          `websocket connection closed with chatRoom-${chatRoomId}`,
        );
      };
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [chatRoomId]);

  return (
    <ContentsTextDiv>
      <ChatLogSection>
        {chatLogList.length > 0
          ? chatLogList.map((chatLog) => (
              <div key={chatLog.id}>
                <ChatBox>
                  <img
                    alt="user-profile"
                    src={`${SNACKCHAT_API_URL}${chatLog.user_profile}`}
                    style={{ width: '2rem', height: '2rem' }}
                    onError={(event) => {
                      event.currentTarget.src = UserDefaultProfile;
                    }}
                  />
                  <ChatLogContainer>
                    <ChatLogHeader>
                      <DefaultBoldP style={{ marginRight: '0.5rem' }}>
                        {chatLog.sender}
                      </DefaultBoldP>
                      <DefaultPCustom
                        fontColor={COMMENT_DARK_COLOR}
                        fontSize={0.5}
                      >
                        {`${chatLog.date} ${chatLog.cur_time}`}
                      </DefaultPCustom>
                    </ChatLogHeader>
                    <DefaultPCustom
                      fontColor={COMMENT_LIGHT_COLOR}
                      fontSize={1}
                    >
                      {chatLog.message}
                    </DefaultPCustom>
                  </ChatLogContainer>
                </ChatBox>
              </div>
            ))
          : null}
      </ChatLogSection>
      <InputDiv
        backgroundColor={TEXT_FIELD_DISABLED_COLOR}
        messageSendCallback={(msg: string) => {
          try {
            if (
              webSocket !== null &&
              chatRoomId >= 0 &&
              parseToken &&
              parseToken.user_id >= 0
            ) {
              webSocket.send(
                JSON.stringify({
                  room_id: chatRoomId,
                  message: msg,
                  sender_id: parseToken.user_id,
                  images: '',
                }),
              );
            }
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </ContentsTextDiv>
  );
}
