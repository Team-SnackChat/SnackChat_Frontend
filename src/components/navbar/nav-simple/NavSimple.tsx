import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  asyncGetServerList,
  select,
} from '../../../store/reducers/getServerReducer';
import HomeIcon from '../../../assets/images/home.svg';
import DefaultServerIcon from '../../../assets/images/default-server.svg';
import { MAIN_COLOR_BASE } from '../../../assets/colors';
import store, { RootStateType } from '../../../store/configureStore';

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

const ServerProfileDiv = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 30%;
  background-color: #36383f;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const ServerProfileList = ({
  serverList,
  accessToken,
  onClick,
}: {
  serverList: Array<any>;
  accessToken: string | null;
  onClick: any;
}) => (
  <>
    {serverList.map((serverInfo: any) => (
      <div key={serverInfo.id} style={{ margin: '0.4rem 0' }}>
        <ServerProfileDiv
          onClick={() => onClick(serverInfo.server_name, serverInfo.id)}
        >
          <img
            alt="server-img"
            src={`${SNACKCHAT_API_URL}${serverInfo.server_profile}`}
            onError={(event) => {
              event.currentTarget.src = DefaultServerIcon;
            }}
          />
        </ServerProfileDiv>
      </div>
    ))}
  </>
);

export default function NavSimple() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
  );
  const serverList = useSelector(
    (state: RootStateType) => state.getServerList.serverList,
  );

  const selectedServerId = useSelector(
    (state: RootStateType) => state.getServerList.selectedServerId,
  );

  useEffect(() => {
    console.log(selectedServerId);
  }, [selectedServerId]);

  useEffect(() => {
    const asyncGetServerListWrapper = async () => {
      if (accessToken) {
        await store.dispatch(asyncGetServerList(accessToken));
      }
    };
    asyncGetServerListWrapper().then(() => {});
  }, [accessToken]);

  return (
    <SimpleNav>
      <ServerProfileDiv>
        <img alt="home-button" src={HomeIcon} width="100%" height="auto" />
      </ServerProfileDiv>
      <Divider />
      {serverList ? (
        <ServerProfileList
          serverList={serverList}
          accessToken={accessToken}
          onClick={(serverName: string, serverId: number) => {
            dispatch(select({ serverName, serverId }));
          }}
        />
      ) : (
        <div />
      )}
    </SimpleNav>
  );
}
