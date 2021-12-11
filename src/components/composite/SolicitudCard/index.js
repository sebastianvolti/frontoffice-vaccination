import React from "react";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Chip from '@material-ui/core/Chip';

import { CancelarSolicitud } from '../../../services/reservas.js';

import { TwitterShareButton, FacebookShareButton, WhatsappShareButton, WhatsappIcon, FacebookIcon, TwitterIcon} from 'react-share';

import { toast } from 'react-toastify';


function SolicitudCard({vacunatorios, enfermedades, solicitud, reservas}){
  const submit = () => {
    confirmAlert({
      title: 'Cancelación de Solicitud',
      message: '¿Está seguro que desea cancelar la solicitud seleccionada?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => handleCancelarClick(solicitud.codigo)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }

  return(
    <Accordion style={{width: "50%", marginBottom: "20px", backgroundColor: "#eee"}}>
        <AccordionSummary style={{minHeight: "65px"}}
          expandIcon={<ExpandMoreIcon />}>
          <div>
            {
              findEnfermedad(enfermedades, solicitud)
            }
          </div>
          <div style={{marginLeft: "15px"}}>
            {
              buildChip(solicitud)
            }
          </div>
          
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={1} style={{marginBottom: "10px"}}>
            Codigo: {solicitud.codigo}
          </Grid>

        </AccordionDetails>

        <AccordionDetails>
          {buildReservasDiv(reservas, vacunatorios)}
        </AccordionDetails>

        <AccordionDetails>
          {buildFooter(enfermedades, solicitud, submit)}
        </AccordionDetails>
    </Accordion>
  );
}

function buildChip(solicitud){
  if(solicitud){
    if(solicitud.status == "PENDING"){
      return <Chip size="small" label="SIN FECHA" color="secondary"/>
    }else if(solicitud.status == "ASSIGNED"){
      return <Chip size="small" label="APROBADA" color="primary"/>
    }else if(solicitud.status == "DONE"){
      return <Chip size="small" label="FINALIZADA" style={{backgroundColor:'green', color: 'white'}}/>
    }
  }
}

function findEnfermedad(enfermedades, solicitud) {
  if(solicitud) {
    if(enfermedades){
      const enfermedad = enfermedades.find(e => e.id == solicitud.idAgenda);
      return enfermedad.nombre;
    }
  }
}

function findVacunatorio(vacunatorios, vacunatorioId) {
  if(vacunatorios){
    const vacunatorio = vacunatorios.find(v => v.id == vacunatorioId);
    return vacunatorio.nombre;
  }
}

function buildReservasDiv(reservas, vacunatorios){
  if(reservas){
    return (
      <div>
        {reservas.map((r) => (
          <Grid key={r.dosis} container spacing={2} style={{borderTop: "1px solid black", marginBottom: "10px"}}>
            <Grid item xs={12}>
              Dosis: {r.dosis}
            </Grid>
            <Grid item xs={12}>
              Lugar: {findVacunatorio(vacunatorios, r.vacunatorioId)}          
            </Grid>
            <Grid item xs={12}>
              Fecha y Hora: {new Intl.DateTimeFormat('en-GB', {dateStyle: 'short', timeStyle: "short"}).format(Date.parse(r.fecha))}
            </Grid>
          </Grid>
        ))}
      </div>
    )
  }
}

function buildFooter(enfermedades, solicitud, submit){
  if(solicitud){
    if(solicitud.status == "PENDING" || solicitud.status == "ASSIGNED"){
      return(
        <Button onClick={submit} variant="contained" color="primary" style={{width: "190px"}}>
          CANCELAR SOLICITUD
        </Button>
      )
    }else if(solicitud.status == "DONE"){
      const msg = "Oficialmente vacunado contra el " + findEnfermedad(enfermedades, solicitud);
      return (
        <div>
           <FacebookShareButton
            url="http://vacunas07.web.elasticloud.uy/"
            title={msg}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            url="http://vacunas07.web.elasticloud.uy/"
            title={msg}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton
            url="http://vacunas07.web.elasticloud.uy/"
            title={msg}
            separator=":: "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      )
    }
  }
}

function handleCancelarClick(codigo){
  CancelarSolicitud(codigo)
  .then(() => {
    window.location.replace("http://vacunas07.web.elasticloud.uy/solicitudes");
  }).catch((error) => {
    toast.error("Ocurrió un error al cancelar la solicitud");
  })
}
export default SolicitudCard;