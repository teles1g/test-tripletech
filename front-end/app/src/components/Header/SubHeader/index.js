import React from 'react';
import { Link } from 'react-router-dom';

import { NavContainer } from './styles';

function SubHeader() {
  return (
    <NavContainer>
      <nav>
        <ul>
          <li>
            <Link to="/">Procurar</Link>
          </li>
          <li>
            <Link to="/save">Salvar</Link>
          </li>
          <li>
            <Link to="/update">Atualizar</Link>
          </li>
        </ul>
      </nav>
    </NavContainer>
  );
}

export default SubHeader;
