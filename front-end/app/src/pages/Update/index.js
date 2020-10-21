import React, { useState } from 'react';
import Papa from 'papaparse';

import { Main, Warning } from './styles';

import api from '~/services/api';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

function Update() {
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

      const data = {
        id: CsvData[0][0],
        datainicio: CsvData[1][0],
        datafim: CsvData[1][1],
      };

      try {
        setLoading(true);

        await api.put('/schedules', data);

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
            <button type="submit">Atualizar</button>
          </form>
          <Warning>
            <p>{loading && 'Carregando...'}</p>
            <p>{fileError && 'Selecione um arquivo'}</p>
            <p>{failure && 'Erro ao atualizar dados!'}</p>
            <p>{success && 'Dados atualizados com sucesso!'}</p>
          </Warning>
        </main>
      </Main>
      <Footer />
    </>
  );
}

export default Update;
