import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../store/configureStore';
import {
  TEXT_FIELD_DISABLED_COLOR,
  COMMENT_LIGHT_COLOR,
  COMMENT_DARK_COLOR,
} from '../../../assets/colors';
import { DefaultBoldP, DefaultPCustom } from '../../../assets/styles';
import UserDefaultProfile from '../../../assets/images/user_default_profile.svg';
import { InputDiv } from '../../input-div';
import {
  getChatRoomLogList,
  ChatLogResponseType,
} from '../../../services/snackchat-api/getChatRoomLogList';
import { SNACKCHAT_API_URL } from '../../../services/snackchat-api/constants';
import {
  ContentsTextDiv,
  ChatRoomNameDiv,
  ChatLogScrollDiv,
  ChatLogContainer,
  ChatLogHeader,
  ChatLogSection,
  ChatRoomBodyDiv,
  ChatBox,
  AlertNewMessageDiv,
} from './style';

export default function HomeContentsText() {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [displayOption, setDisplayOption] = useState<string>('none');
  const [chatLogList, setChatLogList] = useState<Array<ChatLogResponseType>>(
    [],
  );
  const [arrivalChat, setArrivalChat] = useState<ChatLogResponseType | null>(
    null,
  );
  const [chatSectionHeight, setChatSectionHeight] = useState<number>(0);
  const scrollDivRef = useRef<HTMLDivElement | null>(null);
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

  const resetScrollPositionToBottom = useCallback(() => {
    if (scrollDivRef.current) {
      scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight;
    }
  }, [scrollDivRef]);

  useEffect(() => {
    if (displayOption === 'none') {
      resetScrollPositionToBottom();
    }
  });

  useEffect(() => {
    const updateHeight = () => {
      setChatSectionHeight(Math.trunc((window.innerHeight - 125) / 16));
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    if (arrivalChat !== null) {
      setChatLogList((prev) => [...prev, arrivalChat]);
    }
  }, [arrivalChat]);

  useEffect(() => {
    if (webSocket) {
      webSocket.onmessage = (e) => {
        const parsingData = JSON.parse(e.data);
        setArrivalChat(parsingData);
        if (parseToken && parsingData.email === parseToken.email) {
          resetScrollPositionToBottom();
        } else {
          setDisplayOption('block');
        }
      };
    }
  }, [webSocket, parseToken, resetScrollPositionToBottom]);

  useEffect(() => {
    const asyncGetChatRoomLogListWrapper = async () => {
      if (accessToken && chatRoomId >= 0) {
        const response = await getChatRoomLogList({
          token: accessToken,
          chatRoomId,
        });
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
      <ChatRoomNameDiv>
        <DefaultBoldP>🍪 {chatRoomName}</DefaultBoldP>
      </ChatRoomNameDiv>
      <ChatRoomBodyDiv>
        <ChatLogSection height={chatSectionHeight}>
          <ChatLogScrollDiv ref={scrollDivRef}>
            {chatLogList.length > 0
              ? chatLogList.map((chatLog) => (
                  <div key={chatLog.id}>
                    <ChatBox>
                      <img
                        alt="user-profile"
                        src={`${SNACKCHAT_API_URL}${chatLog.profile_image}`}
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
                        {chatLog.message.split('\n').map((msg, idx) => (
                          <div key={chatLog.id + idx.toString()}>
                            <DefaultPCustom
                              fontColor={COMMENT_LIGHT_COLOR}
                              fontSize={1}
                              style={{ marginRight: '1rem' }}
                            >
                              {msg}
                            </DefaultPCustom>
                          </div>
                        ))}
                      </ChatLogContainer>
                    </ChatBox>
                  </div>
                ))
              : null}
          </ChatLogScrollDiv>
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
                    chatroom: chatRoomId,
                    message: msg,
                    sender: parseToken.user_id,
                    images: '',
                  }),
                );
              }
            } catch (e) {
              console.error(e);
            }
          }}
        />
      </ChatRoomBodyDiv>
      <AlertNewMessageDiv
        displayOption={displayOption}
        onClick={() => {
          setDisplayOption('none');
          resetScrollPositionToBottom();
        }}
      >
        <DefaultBoldP>새로운 메세지 확인</DefaultBoldP>
      </AlertNewMessageDiv>
    </ContentsTextDiv>
  );
}
