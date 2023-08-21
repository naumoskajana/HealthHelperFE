import axiosInstance from './axios-instance';

const getMe = () => axiosInstance.get('/user/me');

const login = (credentials) => axiosInstance.post('/user/login', credentials);

const register = (user) => axiosInstance.post('/user/register', user);

const fetchMedicationsForDisease = (disease) => axiosInstance.get(`/diseases/fetchMedicationsForDisease?disease=${disease}`);

const fetchDiseasesForMedication = (medication) => axiosInstance.get(`/medications/fetchDiseasesForMedication?medication=${medication}`);

const generateReport = () => axiosInstance.get('/user/generateReport');

export const API = {
    getMe,
    login,
    register,
    fetchMedicationsForDisease,
    fetchDiseasesForMedication,
    generateReport
}