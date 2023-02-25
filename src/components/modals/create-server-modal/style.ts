import styled from 'styled-components';
import { TextField } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import {
  MAIN_COLOR_BASE,
  TEXT_FIELD_DISABLED_COLOR,
  THEME_COLOR,
} from '../../../assets/colors';

export const CSMDiv = styled.div`
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

export const CSMTitle = styled.h1`
  margin: 0 0 0.5rem 0;
`;

export const CSMServerNameDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

export interface CSMSelectedServerImageDivProps {
  backgroundImage: string;
}

export const CSMSelectedServerImageDiv = styled.div<CSMSelectedServerImageDivProps>`
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

export const CSMServerImageDiv = styled.div`
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

export const CSMContentSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CSMSubmitDiv = styled.div`
  width: 100%;
  align-self: flex-end;
  display: flex;
  justify-content: end;
`;

export const CSMServerNameTextField = muiStyled(TextField)`
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

export interface CSMSubmitButtonProps {
  isDisabled: boolean;
}

export const CSMSubmitButton = styled.button<CSMSubmitButtonProps>`
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
