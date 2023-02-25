import { LoadingCircle, LoadingContainer } from './style';

const LoadingContents = () => (
  <LoadingContainer>
    <LoadingCircle delay={0} />
    <LoadingCircle delay={0.3} />
    <LoadingCircle delay={0.6} />
    <LoadingCircle delay={0.9} />
  </LoadingContainer>
);

export default LoadingContents;
