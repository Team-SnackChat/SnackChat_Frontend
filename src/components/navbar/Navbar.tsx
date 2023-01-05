import styled from 'styled-components';
import { NavSimple } from './nav-simple';
import { NavDetail } from './nav-detail';

const Nav = styled.nav`
  display: flex;
  min-width: 20rem;
`;

export default function Navbar() {
  return (
    <Nav>
      <NavSimple />
      <NavDetail />
    </Nav>
  );
}
