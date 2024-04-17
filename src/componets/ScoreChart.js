import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import fetchData from '../services/api';

const ScoreChart = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchAndPlotData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAndPlotData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.candidate_name),
          datasets: [{
            label: 'AI Generated Score',
            data: data.map(item => item.ai_generated_score),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
            },
            y: {
              display: true,
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [data]); 

  return <canvas ref={canvasRef} width="400" height="400"></canvas>;
}

export default ScoreChart;
