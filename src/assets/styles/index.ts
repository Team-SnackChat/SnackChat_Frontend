import styled from 'styled-components';

interface DefaultFontProps {
  fontSize: number;
  fontColor: string;
}

export const DefaultP = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: normal;
  color: white;
  margin: 0;
`;

export const DefaultPCustom = styled.p<DefaultFontProps>`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: ${(props) => props.fontSize || 1}rem;
  font-weight: normal;
  color: ${(props) => props.fontColor || 'white'};
  margin: 0;
`;

export const DefaultBoldP = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  margin: 0;
`;

export const DefaultBoldPCustom = styled.p<DefaultFontProps>`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: ${(props) => props.fontSize || 1}rem;
  font-weight: bold;
  color: ${(props) => props.fontColor || 'white'};
  margin: 0;
`;
