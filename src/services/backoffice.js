import axios from "axios";

export function GetVacunatorios(departamento) {
  const request = {
      url: "/reservas-web/api/backoffice/vacunatorios",
      params: {
        departamento: departamento
      },
      method: "get",
      baseURL: "http://reservas07.web.elasticloud.uy",
  };
  return axios(request);
}

export function GetEnfermedades() {
  const request = {
      url: "reservas-web/api/backoffice/enfermedades",
      method: "get",
      baseURL: "http://reservas07.web.elasticloud.uy",
  };
  return axios(request);
}
