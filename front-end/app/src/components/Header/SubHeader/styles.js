import styled from 'styled-components';

export const NavContainer = styled.div`
  background: #f3847c;
  opacity: 1;

  nav {
    max-width: 1280px;

    ul {
      display: flex;
      padding: 14px 60px;

      a {
        color: white;
        font-size: 20px;
        font-weight: bold;
        padding-right: 20px;
      }
    }
  }
`;
