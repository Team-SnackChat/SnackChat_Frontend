import { useEffect, DragEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import {
  asyncGetServerList,
  select,
  updateServerList,
  getServerListResponseType,
} from '../../../store/reducers/getServerReducer';
import { CreateServerModal } from '../../modals/create-server-modal';
import HomeIcon from '../../../assets/images/home.svg';
import { ReactComponent as ServerAdderIcon } from '../../../assets/images/server-adder.svg';
import DefaultServerIcon from '../../../assets/images/default-server.svg';
import store, { RootStateType } from '../../../store/configureStore';
import { SNACKCHAT_API_URL } from '../../../services/snackchat-api/constants';
import { SimpleNav, ServerProfileDiv, Divider } from './style';

const ServerProfileList = () => {
  const dispatch = useDispatch();
  const serverList = useSelector(
    (state: RootStateType) => state.getServerList.serverList,
  );
  const selectedServerId = useSelector(
    (state: RootStateType) => state.getServerList.selectedServerId,
  );

  const onDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('index', index.toString());
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>, newIndex: number) => {
    const oldIndex = e.dataTransfer.getData('index');
    const newServerProfiles = [...serverList];
    const [removedServerProfile] = newServerProfiles.splice(
      parseInt(oldIndex, 10),
      1,
    );
    newServerProfiles.splice(newIndex, 0, removedServerProfile);
    dispatch(updateServerList(newServerProfiles));
  };

  const handleServerProfileDivClick = (
    serverInfo: getServerListResponseType,
  ) => {
    dispatch(
      select({
        serverName: serverInfo.server_name,
        serverId: serverInfo.id,
      }),
    );
  };

  return serverList ? (
    <>
      {serverList.map((serverInfo: getServerListResponseType, index) => (
        <div key={serverInfo.id} style={{ margin: '0.4rem 0' }}>
          <Tooltip title={serverInfo.server_name} placement="right" arrow>
            <ServerProfileDiv
              serverId={serverInfo.id}
              selectedServerId={selectedServerId}
              onClick={() => {
                handleServerProfileDivClick(serverInfo);
              }}
              onDragStart={(e: DragEvent<HTMLDivElement>) =>
                onDragStart(e, index)
              }
              onDragOver={onDragOver}
              onDrop={(e: DragEvent<HTMLDivElement>) => onDrop(e, index)}
              draggable
            >
              <img
                alt="server-img"
                style={{ width: '100%', borderRadius: '30%' }}
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
  ) : (
    <div />
  );
};

const ServerAdder = ({ onClick }: { onClick: () => void }) => (
  <div style={{ marginTop: '0.5rem' }}>
    <Tooltip title="서버 추가하기" placement="right" arrow>
      <ServerProfileDiv selectedServerId={-2} serverId={-3}>
        <ServerAdderIcon
          onClick={onClick}
          width="80%"
          height="auto"
          fill="#E9A854"
        />
      </ServerProfileDiv>
    </Tooltip>
  </div>
);

export default function NavSimple() {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const accessToken = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
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
      <ServerProfileDiv serverId={-2} selectedServerId={selectedServerId}>
        <img alt="home-button" src={HomeIcon} width="100%" height="auto" />
      </ServerProfileDiv>
      <Divider />
      <ServerProfileList />
      <ServerAdder onClick={() => setCreateModalOpen(true)} />
      <CreateServerModal
        isOpen={createModalOpen}
        handleClose={() => {
          setCreateModalOpen(false);
        }}
      />
    </SimpleNav>
  );
}
