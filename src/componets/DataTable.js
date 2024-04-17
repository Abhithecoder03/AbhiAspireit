import React, { useState, useEffect } from 'react';
import fetchData from '../services/api';

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Candidate Name</th>
          <th>Interview Question</th>
          <th>Response</th>
          <th>Score</th>
          <th>Other Metadata</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.candidate_name}</td>
            <td>{item.interview_question}</td>
            <td>{item.candidate_response}</td>
            <td>{item.ai_generated_score}</td>
            <td>
              {item.other_metadata && Object.entries(item.other_metadata).map(([key, value]) => (
                <span key={key}>{`${key}: ${value} `}</span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
