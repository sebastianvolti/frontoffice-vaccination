import React, { useState,  useEffect } from "react";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { GetVacunatorios } from '../../../services/backoffice.js'

function SelectorVacunatorio({departamento, vacunatorio, setVacunatorio}){

  const [vacunatorios, setVacunatorios] = useState([]);

  useEffect(() => {  
    console.log("loading vacunatorios");  
    GetVacunatorios(departamento)
    .then((response) => {
      console.log(response.data);
      setVacunatorios(response.data);
    });    
    
  }, [departamento])

  const handleChangeVacunatorio = (event) => {
    setVacunatorio(event.target.value);
  } 

  return(
    <FormControl className="reservation-input-text" disabled={departamento == ""} variant={departamento == "" ? "filled" : ""}>
      <InputLabel htmlFor="input-departamento">Vacuatorio</InputLabel>
      <Select          
        value={vacunatorio}
        onChange={handleChangeVacunatorio}
        inputProps={{
          name: 'vacunatorio',
          id: 'input-vacunatorio',
        }}
      >
        {
          vacunatorios.map((vacunatorio) => 
            <MenuItem value={vacunatorio.id}>{vacunatorio.nombre}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  );
}

export default SelectorVacunatorio;