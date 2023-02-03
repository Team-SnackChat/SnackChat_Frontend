import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getServerList } from '../../../services/snackchat-api/getServerList';
import HomeIcon from '../../../assets/images/home.svg';
import DefaultServerIcon from '../../../assets/images/default-server.svg';
import { MAIN_COLOR_BASE } from '../../../assets/colors';
import { RootStateType } from '../../../store/configureStore';
import { getChatRoomList } from '../../../services/snackchat-api/getChatRoomList';

const SNACKCHAT_API_URL = process.env.REACT_APP_SNACKCHAT_API_URL;
const SimpleNav = styled.nav`
  background-color: ${MAIN_COLOR_BASE};
  padding: 0.75rem 1rem;
  border-width: 0;
  border-right-width: 0.25rem;
  border-style: solid;
  border-image: linear-gradient(
      to bottom,
      rgba(233, 168, 84, 1),
      rgba(20, 20, 21, 1)
    )
    1 100%;
  min-width: 3rem;
  width: 3rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Divider = styled.hr`
  width: 2.5rem;
  border-top: 0.1rem solid #bbb;
`;

const TestDiv = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 30%;
  background-color: #36383f;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export default function NavSimple() {
  const accessToken = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
  );
  const [serverList, setServerList] = useState([]);

  useEffect(() => {
    const asyncGetServerList = async () => {
      if (accessToken) {
        const response = await getServerList({ token: accessToken });
        console.log(response);
        return response;
      }
      return null;
    };
    asyncGetServerList().then((r) => {
      setServerList(r);
    });
  }, [accessToken]);
  return (
    <SimpleNav>
      <TestDiv>
        <img alt="home-button" src={HomeIcon} width="100%" height="auto" />
      </TestDiv>
      <Divider />
      {serverList ? (
        serverList.map((serverInfo: any) => (
          <div key={serverInfo.id} style={{ margin: '0.25rem 0' }}>
            <TestDiv
              onClick={async () => {
                if (accessToken) {
                  const response = await getChatRoomList({
                    token: accessToken,
                    serverId: serverInfo.id,
                  });
                  console.dir(response);
                }
              }}
            >
              <img
                alt="server-img"
                src={`${SNACKCHAT_API_URL}${serverInfo.server_profile}`}
                onError={(event) => {
                  event.currentTarget.src = DefaultServerIcon;
                }}
              />
            </TestDiv>
          </div>
        ))
      ) : (
        <div />
      )}
    </SimpleNav>
  );
}
