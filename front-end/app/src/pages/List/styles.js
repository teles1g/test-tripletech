import styled from 'styled-components';

export const Main = styled.div`
  form {
    max-width: 1280px;
    margin: 50px auto;
    display: flex;
    justify-content: center;

    input {
      background: #dcdcdc;
      margin: 0 10px;
      padding: 10px;
      border: none;
      outline: none;
      text-align: center;
      border-radius: 5px;
    }

    button {
      background: #ee5044;
      margin: 0 10px;
      padding: 10px;
      color: white;
      border: none;
      outline: none;
      font-weight: bold;
      border-radius: 5px;
    }
  }
`;

export const Table = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  table {
    padding: 20px;
  }
`;

export const Warning = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  p {
    color: black;
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
  }
`;
