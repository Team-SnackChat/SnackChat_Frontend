import styled from 'styled-components';

const ProfileDiv = styled.div`
  width: 3rem;
  height: 3rem;
  border: 0;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export default function ProfileCircle() {
  return (
    <ProfileDiv>
      <p>hi</p>
    </ProfileDiv>
  );
}
