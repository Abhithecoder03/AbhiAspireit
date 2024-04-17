import React, { useState, useEffect } from 'react';
import fetchData from './services/api';
import DataTable from './componets/DataTable';
import ScoreChart from './componets/ScoreChart';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div className="App">
      <h1>Candidate Dashboard</h1>
      <DataTable data={data} />
      <ScoreChart data={data} />
    </div>
  );
}

export default App;
