import React, { useState } from 'react';
import Papa from 'papaparse';
import faker from 'faker';

import { Main, Warning } from './styles';

import api from '~/services/api';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

function Save() {
  const [CsvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileError, setFileError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setSuccess(false);
    setFailure(false);

    if (CsvData.length === 0) {
      setFileError(true);
    } else {
      setFileError(false);

      const local = faker.address.city();

      const data = {
        pessoa1: CsvData[1][0],
        pessoa2: CsvData[1][1],
        pessoa3: CsvData[1][2],
        datainicio: CsvData[2][0],
        datafim: CsvData[2][1],
        local,
      };

      try {
        setLoading(true);

        await api.post('/schedules', data);

        setLoading(false);
        setSuccess(true);
      } catch (error) {
        setLoading(false);
        setFailure(error);
      }
    }
  }

  function handleFileChange({ target }) {
    const file = target.files[0];

    Papa.parse(file, {
      download: true,
      complete: (results) => {
        const { data } = results;

        setCsvData(data);
      },
    });
  }

  return (
    <>
      <Header />
      <Main>
        <main>
          <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button type="submit">Salvar</button>
          </form>
          <Warning>
            <p>{loading && 'Carregando...'}</p>
            <p>{fileError && 'Selecione um arquivo'}</p>
            <p>{failure && 'Erro ao salvar os dados!'}</p>
            <p>{success && 'Dados salvos com sucesso!'}</p>
          </Warning>
        </main>
      </Main>
      <Footer />
    </>
  );
}

export default Save;
