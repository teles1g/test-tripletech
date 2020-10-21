import React from 'react';

import { HeaderContainer } from './styles';

import SubHeaderContainer from './SubHeader';

function Header() {
  return (
    <>
      <HeaderContainer>
        <header>
          <h1>Agendamentos</h1>
        </header>
      </HeaderContainer>
      <SubHeaderContainer />
    </>
  );
}

export default Header;
