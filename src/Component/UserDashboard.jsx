import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig"; // Assurez-vous que vous avez une instance d'axios configurée avec les paramètres nécessaires
import Cookies from "js-cookie"; // Importer le module js-cookie

import { useNavigate } from "react-router-dom"; 
function UserDashboard() {
  // Déclaration des états pour stocker les données du tableau de bord et les erreurs
  const [dashboardData, setDashboardData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  // Effectuer la requête à l'API lorsque le composant est monté
  useEffect(() => {

     // Vérifier si le cookie 'jwtToken' est disponible
     const jwtToken = Cookies.get('jwtToken');
     if (!jwtToken) {
        // Si le cookie n'est pas disponible, rediriger vers la page de connexion
        navigate('/login');
     }
    // Fonction pour récupérer les données
    const fetchDashboardData = async () => {

      try {
        const response = await axiosInstance.get('/user/dashboard');  // Remplacez par l'URL correcte
        setDashboardData(response.data); // Stocker les données dans l'état
      } catch (error) {
        // Gérer l'erreur en cas de problème avec la requête
        if (error.response) {
          setErrorMessage('Erreur de récupération des données : ' + error.response.data.message);
        } else {
          setErrorMessage('Une erreur est survenue');
        }
      }
    };
   

    fetchDashboardData(); // Appeler la fonction pour récupérer les données lors du montage du composant
  }, []); // Le tableau vide signifie que la requête est envoyée une seule fois au montage du composant

  return (
    <div>
      <h1>Tableau de bord</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Afficher les données du tableau de bord ou un message de chargement */}
      {dashboardData ? (
        <div>
          <p>Bienvenue, voici vos informations :</p>
          <pre>{JSON.stringify(dashboardData, null, 2)}</pre> {/* Afficher les données sous forme de JSON formaté */}
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}

export default UserDashboard;
