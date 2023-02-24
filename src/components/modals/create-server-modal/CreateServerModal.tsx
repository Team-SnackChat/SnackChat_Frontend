import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Tooltip } from '@mui/material';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import {
  MAIN_COLOR_BASE,
  COMMENT_DARK_COLOR,
  THEME_COLOR,
  TEXT_FIELD_DISABLED_COLOR,
} from '../../../assets/colors';
import { ReactComponent as ServerImageUploadIcon } from '../../../assets/images/server-image-upload.svg';
import { DefaultBoldPCustom, DefaultPCustom } from '../../../assets/styles';
import { SnackChatDefaultModal, ModalProps } from '../index';
import { postNewServer } from '../../../services/snackchat-api/postNewServer';
import { RootStateType } from '../../../store/configureStore';

const CSMDiv = styled.div`
  min-width: 22rem;
  min-height: 20rem;
  padding: 1.6rem 2rem;
  background-color: ${MAIN_COLOR_BASE};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CSMTitle = styled.h1`
  margin: 0 0 0.5rem 0;
`;

const CSMServerNameDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

interface CSMSelectedServerImageDivProps {
  backgroundImage: string;
}

const CSMSelectedServerImageDiv = styled.div<CSMSelectedServerImageDivProps>`
  width: 5rem;
  height: 5rem;
  margin-top: 1rem;
  border: 0.2rem solid ${THEME_COLOR};
  border-radius: 50%;
  background-image: ${(props) =>
    props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  cursor: pointer;

  &:hover {
    animation: pulse 0.8s ease-in-out forwards;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.1);
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const CSMServerImageDiv = styled.div`
  width: 5rem;
  height: 5rem;
  margin-top: 1rem;
  border: 0.2rem dashed ${THEME_COLOR};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    animation: pulse 0.8s ease-in-out forwards;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.1);
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const CSMContentSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CSMSubmitDiv = styled.div`
  width: 100%;
  align-self: flex-end;
  display: flex;
  justify-content: end;
`;

const CSMServerNameTextField = muiStyled(TextField)`
width: 100%;
  height: 1.2rem;
  margin: 0.5rem 0 0 0;

  & input {
    color: white;
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: gray;
    }

    &:hover fieldset {
      border-color: lightgray;
    }

    &.Mui-focused fieldset {
      border-color: ${THEME_COLOR};
    }
  }
`;

interface CSMSubmitButtonProps {
  isDisabled: boolean;
}

const CSMSubmitButton = styled.button<CSMSubmitButtonProps>`
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.isDisabled ? TEXT_FIELD_DISABLED_COLOR : THEME_COLOR};
  border-radius: 0.5rem;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) =>
      props.isDisabled ? TEXT_FIELD_DISABLED_COLOR : '#c99249'};
  }
`;

// 이미지 깜빡임을 없애기위해 추가했으나
// 필요없었던 코드
// const CSMSelectedServerImageDivContainer = React.memo(
//   ({
//     imageObject,
//     handleImageClick,
//   }: {
//     imageObject: string;
//     handleImageClick: () => void;
//   }) => (
//     <CSMSelectedServerImageDiv
//       backgroundImage={imageObject}
//       onClick={handleImageClick}
//     />
//   ),
// );

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
    if (accessToken) {
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
              accept=".png, .jpg, .svg, .jpeg"
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
