import axios from "axios";

import { SERVICES_URL } from "../constants";

export function Agendas() {
    const request = {
        url: "/reports-web/rest/reports/public/agendas",
        method: "get",
        baseURL: SERVICES_URL,
    };
    return axios(request);
}