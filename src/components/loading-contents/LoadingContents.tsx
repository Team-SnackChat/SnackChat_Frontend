import styled, { keyframes } from 'styled-components';

interface LoadingCircleProps {
  delay: number;
}

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2rem);
  }
  100% {
    transform: translateY(0);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingCircle = styled.div<LoadingCircleProps>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 0 1rem;
  animation: ${bounce} 1.5s ease-in-out infinite,
    color-change 5s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
  background-color: #e9a854;
  transition: background-color 0.3s ease-in-out;

  @keyframes color-change {
    0% {
      background-color: #e9a854;
    }
    50% {
      background-color: #66400d;
    }
    100% {
      background-color: #e9a854;
    }
  }
`;

const LoadingContents = () => (
  <LoadingContainer>
    <LoadingCircle delay={0} />
    <LoadingCircle delay={0.3} />
    <LoadingCircle delay={0.6} />
    <LoadingCircle delay={0.9} />
  </LoadingContainer>
);

export default LoadingContents;
