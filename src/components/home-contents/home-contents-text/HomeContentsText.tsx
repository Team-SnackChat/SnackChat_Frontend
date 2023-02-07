import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import store, { RootStateType } from '../../../store/configureStore';
import {
  MAIN_COLOR_BASE,
  TEXT_FIELD_DISABLED_COLOR,
} from '../../../assets/colors';
import { DefaultP } from '../../../assets/styles';
import { InputDiv } from '../../input-div';
import { getChatRoomLogList } from '../../../services/snackchat-api/getChatRoomLogList';

const ContentsTextDiv = styled.div`
  background-color: ${MAIN_COLOR_BASE};
  padding: 0.5rem 1rem;
  width: 100%;
  height: auto;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 1.5rem 1rem;
`;

const ChatLogSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${MAIN_COLOR_BASE};
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: normal;
  color: white;
`;
// const onTestButtonClick = () => {
//   const socket = new WebSocket('ws://carrotww.shop/chats/2/');
//   setWebSocket(socket);
//   socket.onopen = () => {
//     console.log('ws connected!');
//   };
// };
// const onSendButtonClick = () => {

// };

export default function HomeContentsText() {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [recallFlag, setRecallFlag] = useState<boolean>(false);
  const [chatLogList, setChatLogList] = useState<Array<any>>([]);
  const chatRoomId = useSelector(
    (state: RootStateType) => state.updateChatRoom.chatRoomId,
  );
  const accessToken = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
  );
  const parseToken = useSelector(
    (state: RootStateType) => state.getToken.parseToken,
  );

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
  }, [accessToken, chatRoomId, recallFlag]);

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
      <ChatLogSection>Chat log</ChatLogSection>
      {chatLogList ? (
        chatLogList.map((chatLog) => (
          <div key={chatLog.id}>
            <DefaultP>{chatLog.message}</DefaultP>
          </div>
        ))
      ) : (
        <div />
      )}
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
              setRecallFlag(!recallFlag);
            }
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </ContentsTextDiv>
  );
}
