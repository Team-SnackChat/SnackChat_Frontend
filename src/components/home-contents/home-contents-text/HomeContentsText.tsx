import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootStateType } from '../../../store/configureStore';
import {
  MAIN_COLOR_BASE,
  MAIN_COLOR_DARK,
  TEXT_FIELD_DISABLED_COLOR,
  COMMENT_LIGHT_COLOR,
  COMMENT_DARK_COLOR,
  THEME_COLOR,
} from '../../../assets/colors';
import { DefaultBoldP, DefaultPCustom } from '../../../assets/styles';
import UserDefaultProfile from '../../../assets/images/user_default_profile.svg';
import { InputDiv } from '../../input-div';
import { getChatRoomLogList } from '../../../services/snackchat-api/getChatRoomLogList';

const SNACKCHAT_API_URL = process.env.REACT_APP_SNACKCHAT_API_URL;

const ContentsTextDiv = styled.div`
  background-color: ${MAIN_COLOR_BASE};
  width: 100%;
  //padding: 0.5rem 1rem;
  margin: 1.5rem 0;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const ChatRoomNameDiv = styled.div`
  align-self: flex-start;
  margin-left: 1rem;
`;

const ChatRoomBodyDiv = styled.div`
  height: 100%;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

interface ChatLogSectionProps {
  height: number;
}

const ChatLogSection = styled.section<ChatLogSectionProps>`
  width: 100%;
  height: ${(props) => props.height}rem;
  background-color: ${MAIN_COLOR_BASE};
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const ChatLogScrollDiv = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.3rem;
    background-color: ${MAIN_COLOR_DARK};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background-color: ${THEME_COLOR};
  }
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

interface AlertNewMessageDivProps {
  displayOption: string;
}

const AlertNewMessageDiv = styled.div<AlertNewMessageDivProps>`
  position: fixed;
  bottom: 5rem;
  right: 4rem;
  height: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${THEME_COLOR};
  display: ${(props) => props.displayOption};

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export default function HomeContentsText() {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [displayOption, setDisplayOption] = useState<string>('none');
  const [chatLogList, setChatLogList] = useState<Array<any>>([]);
  const [arrivalChat, setArrivalChat] = useState<Object>({});
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
    arrivalChat && setChatLogList((prev) => [...prev, arrivalChat]);
  }, [arrivalChat]);

  useEffect(() => {
    if (webSocket) {
      webSocket.onmessage = (e) => {
        const parsingData = JSON.parse(e.data);
        console.log(parsingData);
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
                          style={{ marginRight: '1rem' }}
                        >
                          {chatLog.message}
                        </DefaultPCustom>
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
