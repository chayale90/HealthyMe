import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import React from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scales: {
    y: {
      min: 40,
      max: 130,
      title: {
        display: true,
        text: 'My Weight (kg)',
      },
    }
  }
};

const ChartJsMyWeight = () => {
  const { user } = useSelector((myStore) => myStore.userSlice);
  const updatedDates = (user?.weight && user.weight.length > 0) ? (user?.weight).map((item) => {
    return (
      item && item.updatedWeight ? item.updatedWeight.substring(0, 10) : ''
      )
  }) : []
  const myWeights = (user?.weight && user.weight.length > 0) ? (user?.weight).map((item) => {
    return (
      item.myWeight
    )
  }) : []
  const labels = [...updatedDates];
  const data = {
    labels,
    datasets: [
      {
        label: "My Weight",
        data: (user?.weight && user.weight.length > 0) ? [...myWeights] : "",
        backgroundColor: "#A435F0",
        borderColor: "#A435F0",
      }
    ],
  };
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      height: "300px",
      '@media (maxWidth: 768px)': {
        width: "400px"
      },  
      '@media (maxWidth: 1200px)': {
        width: "800px"
      }
    }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default ChartJsMyWeight;