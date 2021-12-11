import axios from "axios";

import { SERVICES_URL } from "../constants";

export function NuevaSolicitud(solicitud) {
  const request = {
      url: "/reservas-web/api/solicitudes/",
      method: "post",
      baseURL: "http://reservas07.web.elasticloud.uy",
      data: solicitud
  };
  return axios(request);
}

export function CancelarSolicitud(codigo) {
  const request = {
      url: "/reservas-web/api/solicitudes/cancelar/" + codigo,
      method: "post",
      baseURL: "http://reservas07.web.elasticloud.uy",
  };
  return axios(request);
}

export function GetDateHistogram() {
  const request = {
      url: "reservas-web/api/reservas/histogram/vacunados",
      method: "get",
      baseURL: "http://reservas07.web.elasticloud.uy",
  };
  return axios(request);
}

export function GetSolicitudes(cedula) {
  const request = {
      url: "reservas-web/api/solicitudes/find/" + cedula,
      method: "get",
      baseURL: "http://reservas07.web.elasticloud.uy",
  };
  return axios(request);
}


