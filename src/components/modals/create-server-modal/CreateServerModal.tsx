import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import { COMMENT_DARK_COLOR } from '../../../assets/colors';
import { ReactComponent as ServerImageUploadIcon } from '../../../assets/images/server-image-upload.svg';
import { DefaultBoldPCustom, DefaultPCustom } from '../../../assets/styles';
import { SnackChatDefaultModal, ModalProps } from '../index';
import { postNewServer } from '../../../services/snackchat-api/postNewServer';
import { RootStateType } from '../../../store/configureStore';
import {
  CSMDiv,
  CSMSelectedServerImageDiv,
  CSMServerNameTextField,
  CSMServerImageDiv,
  CSMSubmitDiv,
  CSMServerNameDiv,
  CSMContentSection,
  CSMTitle,
  CSMSubmitButton,
} from './style';

export default function CreateServerModal({ isOpen, handleClose }: ModalProps) {
  const [newServerName, setNewServerName] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<Blob | MediaSource | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const accessToken = useSelector(
    (state: RootStateType) => state.getToken.accessToken,
  );

  const urlObject = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
    return '';
  }, [selectedImage]);

  const asyncMakeDefaultServerImage = async () => {
    const response = await fetch('../../../assets/images/default-server.svg');
    const svgText = await response.text();
    return new Blob([svgText], { type: 'image/svg+xml' });
  };

  const handleServernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewServerName(event.target.value);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files) {
      const newServerImg = event.target.files[0];
      if (newServerImg) {
        setSelectedImage(newServerImg);
      } else {
        setSelectedImage(selectedImage);
      }
    }
  };

  const handleModalClose = () => {
    setNewServerName('');
    setSelectedImage(null);
    handleClose();
  };

  const handleSubmit = async () => {
    const defaultServerProfile = await asyncMakeDefaultServerImage();
    if (accessToken && newServerName !== '') {
      await postNewServer({
        serverName: newServerName,
        serverProfile:
          selectedImage === null ? defaultServerProfile : selectedImage,
        token: accessToken,
      });
    }
  };

  return (
    <div>
      <SnackChatDefaultModal open={isOpen} onClose={handleModalClose}>
        <CSMDiv>
          <CSMContentSection>
            <CSMTitle>
              <DefaultBoldPCustom fontColor="white" fontSize={1.2}>
                새로운 서버 만들기
              </DefaultBoldPCustom>
            </CSMTitle>
            <DefaultPCustom fontColor={COMMENT_DARK_COLOR} fontSize={0.7}>
              대화, 커뮤니티등 다양한 활동을 할 수 있습니다.
            </DefaultPCustom>
            <DefaultPCustom fontColor={COMMENT_DARK_COLOR} fontSize={0.7}>
              나만의 서버를 만들어 SnackChat을 즐기세요!
            </DefaultPCustom>
            {selectedImage ? (
              <Tooltip title="서버이미지 변경하기" placement="right" arrow>
                <CSMSelectedServerImageDiv
                  backgroundImage={urlObject}
                  onClick={handleImageClick}
                />
              </Tooltip>
            ) : (
              <Tooltip title="서버이미지 추가하기" placement="right" arrow>
                <CSMServerImageDiv onClick={handleImageClick}>
                  <ServerImageUploadIcon width="60%" />
                </CSMServerImageDiv>
              </Tooltip>
            )}
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
            <CSMServerNameDiv>
              <DefaultBoldPCustom fontColor="white" fontSize={0.7}>
                서버 이름
              </DefaultBoldPCustom>
              <CSMServerNameTextField
                value={newServerName}
                onChange={handleServernameChange}
                id="server-name-input"
                variant="outlined"
                autoComplete="off"
              />
            </CSMServerNameDiv>
          </CSMContentSection>
          <CSMSubmitDiv>
            <CSMSubmitButton
              isDisabled={newServerName === ''}
              onClick={handleSubmit}
            >
              <DefaultBoldPCustom fontColor="white" fontSize={1}>
                만들기
              </DefaultBoldPCustom>
            </CSMSubmitButton>
          </CSMSubmitDiv>
        </CSMDiv>
      </SnackChatDefaultModal>
    </div>
  );
}
