import React, { useState, useEffect } from 'react';

import { Main, Table, Warning } from './styles';

import api from '~/services/api';

import Header from '~/components/Header/';

function List() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (error) setError(false);

    setLoading(true);

    const response = await api.get(`/schedules?date=${date}`);

    if (response.data.length === 0) {
      setLoading(false);
      setError(true);
    }

    setData(response.data);
    setLoading(false);
  }

  function handleInput({ target }) {
    const input = target.value;

    const i = input.split('/');

    const dateF = `${i[1]}-${i[0]}`;

    setDate(dateF);
  }

  return (
    <>
      <Header />
      <Main>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Ex: 09/2020" onChange={handleInput} />
          <button type="submit">Consultar</button>
        </form>
        <Warning>
          <p>{loading && 'Aguarde, carregando dados!'}</p>
          <p>{error && 'Nenhum dado foi encontrado!'}</p>
        </Warning>
        <Table>
          {data.map((schedule, index) => (
            <table key={index.toString()}>
              <tbody>
                <tr>
                  <th>Nome</th>
                  <td>{schedule.pessoa.nome}</td>
                </tr>
                <tr>
                  <th>E-mail</th>
                  <td>{schedule.pessoa.email}</td>
                </tr>
                <tr>
                  <th>Telefone</th>
                  <td>{schedule.pessoa.telefone}</td>
                </tr>
                <tr>
                  <th>Local</th>
                  <td>{schedule.agendamento.local}</td>
                </tr>
                <tr>
                  <th>Data Início</th>
                  <td>{schedule.agendamento.datainicio}</td>
                </tr>
                <tr>
                  <th>Data Fim</th>
                  <td>{schedule.agendamento.datafim}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </Table>
      </Main>
    </>
  );
}

export default List;
