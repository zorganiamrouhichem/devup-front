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
  const [role, setRole] = useState(null);

  // Vérifier si l'utilisateur est déjà connecté et rediriger selon le rôle
  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    const savedRole = Cookies.get('role');
    
    if (jwtToken && savedRole) {
      setRole(savedRole); // Mettre à jour le rôle depuis les cookies
      if (savedRole === 'admin') {
        navigate('/adminpanel'); // Rediriger vers l'admin panel si rôle 'admin'
      } else {
        navigate('/dashboard'); // Rediriger vers le dashboard si rôle 'user'
      }
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

      // Récupérer le rôle et le stocker dans les cookies
      const userRole = response.data.role;
      setRole(userRole);
      Cookies.set('role', userRole, { expires: 7, path: '' });

      // Rediriger l'utilisateur en fonction du rôle
      if (userRole === 'admin') {
        navigate('/adminpanel');
      } else {
        navigate('/dashboard');
      }
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
