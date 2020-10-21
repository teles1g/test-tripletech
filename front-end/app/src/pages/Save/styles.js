import styled from 'styled-components';

export const Main = styled.div`
  main {
    max-width: 1280px;
    margin: 0 auto;
    padding: 210px 0;
    display: flex;
    align-items: center;
    flex-direction: column;

    button {
      background: #ee5044;
      width: 100px;
      height: 53px;
      color: white;
      border: none;
      outline: none;
      font-weight: bold;
      border-radius: 5px;
    }
  }
`;

export const Warning = styled.div`
  margin: 30px 0;

  p {
    color: black;
    font-size: 20px;
    font-weight: bold;
  }
`;
