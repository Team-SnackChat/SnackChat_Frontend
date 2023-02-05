import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import styled from 'styled-components';
import {
  asyncGetServerList,
  select,
  getServerResponse,
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

interface ServerProfileDivProps {
  serverId: number;
  selectedServerId: number;
}

const ServerProfileDiv = styled.div<ServerProfileDivProps>`
  width: 3rem;
  height: 3rem;
  border: ${(props) =>
    props.serverId === props.selectedServerId ? '0.2rem solid white' : 'none'};
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
  selectedServerId,
  onClick,
}: {
  serverList: Array<getServerResponse>;
  selectedServerId: number;
  onClick: any;
}) => (
  <>
    {serverList.map((serverInfo: getServerResponse) => (
      <div key={serverInfo.id} style={{ margin: '0.4rem 0' }}>
        <Tooltip title={serverInfo.server_name} placement="right" arrow>
          <ServerProfileDiv
            serverId={serverInfo.id}
            selectedServerId={selectedServerId}
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
        </Tooltip>
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
    const asyncGetServerListWrapper = async () => {
      if (accessToken) {
        await store.dispatch(asyncGetServerList(accessToken));
      }
    };
    asyncGetServerListWrapper().then(() => {});
  }, [accessToken]);

  return (
    <SimpleNav>
      <ServerProfileDiv serverId={-1} selectedServerId={selectedServerId}>
        <img alt="home-button" src={HomeIcon} width="100%" height="auto" />
      </ServerProfileDiv>
      <Divider />
      {serverList ? (
        <ServerProfileList
          serverList={serverList}
          selectedServerId={selectedServerId}
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
