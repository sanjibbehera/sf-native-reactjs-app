import { API_BASE_URL } from "@/static/img/config"
import axios from "axios"

export const fetchHospitalInfo = async () => {
    const result = await axios.get(`${API_BASE_URL}/gethospitalinfoCount`)
    if (result !== null) {
        return result.data
    } else {
        return null
    }
}
export const fetchMonthlyHospitalVisitCount = async () => {
    const result = await axios.get(`${API_BASE_URL}/getMonthlyHospitalVisitCount`)
    if (result !== null) {
        return result.data
    } else {
        return null
    }
}
export const fetchPatientsByDivision = async () => {
    const result = await axios.get(`${API_BASE_URL}/patientsByDivision`)
    if (result !== null) {
        return result.data
    } else {
        return null
    }
}