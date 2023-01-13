import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { HomePageService } from "../../Service/homeServices";
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
import Box from "@material-ui/core/Box";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function HomePage() {
  const [data, setData] = useState({});
  const [chartData, setChartDate] = useState([]);
  const dayChart = [
    new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    new Date().toLocaleDateString(),
  ];

  const dataTable = {
    labels: dayChart,
    datasets: [
      {
        label: "Lượt Mượn sách thành công",
        data: chartData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        // text: 'Chart.js Line Chart',
      },
    },
    scales: {
      yAxes: {
        ticks: {
          stepSize: 1,
          min: 0,
          beginAtZero: true,
        },
      },
    },
  };

  useEffect(() => {
    HomePageService().then((res) => {
      // console.log(res);
      setData(res.data.data);
      setChartDate(Object.values(res.data.chartData));
    });
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container md={12} lg={12} sm={12} spacing={2}>
        <Grid item md={3} lg={3} sm={6} xs={12}>
          <div className="static_1">
            <h2 className="h4_size">TỔNG SỐ LƯỢNG SÁCH</h2>
            <h1 className="h4_size">{data.books_amount}</h1>
          </div>
        </Grid>
        <Grid item md={3} lg={3} sm={6} xs={12}>
          <div className="static_2">
            <h2 className="h4_size">TỔNG SỐ NGƯỜI DÙNG</h2>
            <h1 className="h4_size">{data.users_amount}</h1>
          </div>
        </Grid>
        <Grid item md={3} lg={3} sm={6} xs={12}>
          <div className="static_3">
            <h2 className="h4_size">LƯỢT YÊU CẦU MƯỢN</h2>
            <h1 className="h4_size">{data.borrow_amount}</h1>
          </div>
        </Grid>
        <Grid item md={3} lg={3} sm={6} xs={12}>
          <div className="static_4">
            <h2 className="h4_size">LƯỢT YÊU CẦU TRẢ</h2>
            <h1 className="h4_size">{data.return_amount}</h1>
          </div>
        </Grid>
      </Grid>
      <div style={{ width: "100%" }}>
        <Line options={options} data={dataTable} />
      </div>
    </Box>
  );
}
