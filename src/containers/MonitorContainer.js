import React, {memo, useEffect, useState} from "react";

import { connect } from "react-redux";

import { GetDateHistogram } from "../services/reservas.js";

import { Line } from 'react-chartjs-2';

var options = {
  scales: {
    y: {
      beginAtZero: true,
    }
  },
  maintainAspectRatio: false
};

function MonitorContainer() {
  const [data, setData] = useState(null);

  useEffect(() => {  
    console.log("loading data");  
    GetDateHistogram()
    .then((response) => {
      var actualData = buildData(response.data);
      setData(actualData);
    });    
    
  }, [])

  return (
    <div>
      <div className="app-subh" style={{paddingLeft: "20px"}}>
        <h3 className="page-title" style={{marginBottom: "30px", marginTop: "20px"}}>Monitor de Vacunación</h3>

        <div className="app-subh" style={{height: "600px", width:"90%"}}>
          <div style={{ height: "600px", border: "1px solid #428bca", borderRadius: "4px", boxShadow: "0 1px 1px rgb(0 0 0 / 5%)"}}>
            <div style={{color: "#fff", backgroundColor: "#0064b1", borderColor: "#0064b1", padding: "10px 15px", borderBottom: "1px solid transparent", borderTopLeftRadius: "3px", borderTopRightRadius: "3px"}}>
              Cantidad de personas vacunadas

            </div>

            <div style={{height: "500px", padding: "15px"}}>
              <Line data={data} options={options} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function buildData(histogram){  
  console.log(histogram);
  let labels = [];
  let data = [];

  for(const entry in histogram.histogram){
    labels.push(entry);
    data.push(histogram.histogram[entry]);
  }

  console.log(labels);
  console.log(data);

  return {
    labels: labels,
    datasets: [
      {
        label: "# de Vacunados",
        data: data,
        fill: false,
        backgroundColor: 'rgb(39, 155, 192)',
        borderColor: 'rgb(39, 155, 192)',
      }
    ]
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default memo(connect(mapStateToProps, null)(MonitorContainer));
