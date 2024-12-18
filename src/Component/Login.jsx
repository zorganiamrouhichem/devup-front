import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig'; // Importation de l'instance Axios
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import '../Style/Login.css';


function Login() {
  // Déclaration des états pour stocker les valeurs des champs et les erreurs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Pour rediriger après la connexion

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken) {
      // Si le cookie jwtToken existe, rediriger l'utilisateur vers le tableau de bord
      navigate('/dashboard');
    }
  }, [navigate]);


  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Effectuer la requête POST pour se connecter
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      });

      // Si la requête réussie, récupérer le token JWT
      const token = response.data.token;
      Cookies.set('jwtToken', token, { expires: 7, path: '' });

       navigate('/dashboard');      
    } catch (error) {
      // Gérer l'erreur en cas d'échec
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message || 'Erreur de connexion');
      } else {
        setErrorMessage('Une erreur est survenue');
      }
    }
  };

  return (
    <div className="login-container">
    <h1>Login</h1>
    
    {/* Formulaire de connexion */}
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-btn">Login</button>
    </form>

    {/* Afficher les erreurs */}
    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </div>
);
}

export default Login;