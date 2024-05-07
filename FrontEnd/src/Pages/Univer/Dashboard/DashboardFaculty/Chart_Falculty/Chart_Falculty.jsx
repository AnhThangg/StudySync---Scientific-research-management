import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./Chart_Falculty.scss"
import { getDashboardForUniver } from "../../../../../api/univerApi";
import { getInfo } from "../../../../../api/infoApi";

const Chart_Faculty = () => {

  const [dashboard, setDashboard] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    getInfo()
      .then((data) => {
        setUser(data)
      })
      .catch((e) => {
        console.log(e);
      })
  },[])

  useEffect(() => {
    getDashboardForUniver(user?.univerCode)
      .then(data => {
        setDashboard(data)
      })
      .catch((e) => {
        console.log(e);
      })
  },[user])

  console.log(dashboard);


  const [options] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: ['CNPM', 'Cơ Khí', 'Du Lịch', 'Ngân Hàng', 'Tiếng Trung', 'IT','Điện tử']
    },
    colors: ['#DC143C'],
    fill: {
      borderRadius: '20px',
      type: 'gradient', 
      gradient: {
        shade: 'dark', 
        type: 'vertical', 
        shadeIntensity: 0.5, 
        gradientToColors: ['#F6E6E6'], 
        inverseColors: false,
        opacityFrom: 1, 
        opacityTo: 0.8, 
        stops: [0, 100] 
      }
    },
    plotOptions: {
      bar: {
        // borderRadius: 30 // Độ cong cho các cạnh trên của cột
      }
    }
  });

  const [series] = useState([
    {
      name: "Sinh Viên",
      data: [30, 12, 25, 41, 51, 62,17]
    }
  ]);

  return (
    <div className="Chart_Faculty">
      <div className="row">
        <div className="mixed-chart" >
          <Chart
            options={options}
            series={series}
            type="bar"
            width="900"
            height="450"
          />
        </div>
      </div>
    </div>
  );
};

export default Chart_Faculty;
