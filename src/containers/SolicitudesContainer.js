import React, {memo, useEffect, useState} from "react";

import { connect } from "react-redux";

import { GetSolicitudes } from "../services/reservas.js";
import { GetEnfermedades, GetVacunatorios } from "../services/backoffice.js";


import SolicitudCard from "../components/composite/SolicitudCard"


function SolicitudesContainer({ auth }) {
  const cedula = (auth.data) ? getCiFromUid(auth.data.uid) : null;

  const [solicitudes, setSolicitudes] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);
  const [vacunatorios, setVacunatorios] = useState([]);

  useEffect(() => {  
    console.log("loading solicitudes"); 

    GetEnfermedades()
    .then((response) => {
      setEnfermedades(response.data);
      GetVacunatorios()
      .then((response) => {
        console.log(response.data);
        setVacunatorios(response.data);
        GetSolicitudes(cedula)
        .then((response) => {
          console.log(response.data);
          setSolicitudes(response.data);     
        }); 
      }); 
    });       
  }, [])

  return (
    <div>
      <div className="app-subh" style={{paddingLeft: "20px"}}>
        <h3 className="page-title" style={{marginBottom: "30px", marginTop: "20px"}}>Mis Solicitudes de Vacunación</h3>

        <div>
          {
            solicitudes.map((s) =>               
              <SolicitudCard key={s.codigo} vacunatorios={vacunatorios} enfermedades={enfermedades} solicitud={s.solicitud} reservas={s.reservas}/>
            )
          }
          
        </div>
      </div>
    </div>
  );
}

function getCiFromUid(uid){
  return uid.split("-")[2];
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default memo(connect(mapStateToProps, null)(SolicitudesContainer));
