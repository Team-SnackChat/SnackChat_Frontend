import { ChangeEvent, useState } from 'react';
import { TextField, Tooltip } from '@mui/material';
import styled from 'styled-components';
import {
  MAIN_COLOR_BASE,
  COMMENT_DARK_COLOR,
  THEME_COLOR,
} from '../../../assets/colors';
import { ReactComponent as ServerImageUploadIcon } from '../../../assets/images/server-image-upload.svg';
import { DefaultBoldPCustom, DefaultPCustom } from '../../../assets/styles';
import { SnackChatDefaultModal, ModalProps } from '../index';

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

const CSMSubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${THEME_COLOR};
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #c99249;
  }
`;

export default function CreateServerModal({ isOpen, handleClose }: ModalProps) {
  const [newServerName, setNewServerName] = useState<string>('');
  const handleServernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewServerName(event.target.value);
  };

  return (
    <div>
      <SnackChatDefaultModal open={isOpen} onClose={handleClose}>
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
            <Tooltip title="서버이미지 추가하기" placement="right" arrow>
              <CSMServerImageDiv>
                <ServerImageUploadIcon width="60%" />
              </CSMServerImageDiv>
            </Tooltip>
            <CSMServerNameDiv>
              <DefaultBoldPCustom fontColor="white" fontSize={0.7}>
                서버 이름
              </DefaultBoldPCustom>
              <TextField
                value={newServerName}
                onChange={handleServernameChange}
                id="server-name-input"
                variant="outlined"
                sx={{
                  width: '100%',
                  height: '1.2rem',
                  margin: '0.5rem 0 0 0',
                  input: { color: 'white' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'gray',
                    },
                    '&:hover fieldset': {
                      borderColor: 'lightgray',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: `${THEME_COLOR}`,
                    },
                  },
                }}
              />
            </CSMServerNameDiv>
          </CSMContentSection>
          <CSMSubmitDiv>
            <CSMSubmitButton>
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
