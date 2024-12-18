import axios from 'axios';
import Cookies from 'js-cookie';

// Crée une instance d'Axios avec une configuration de base
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // URL de votre API Laravel
  withCredentials: true,  // Cela permet d'envoyer et de recevoir des cookies
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});
// Ajouter un intercepteur si nécessaire (par exemple pour ajouter un token à chaque requête)
axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('jwtToken');  // Récupérer le token des cookies
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;  // Ajouter le token dans l'en-tête
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export default axiosInstance;