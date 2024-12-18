import React, { useState } from 'react';
import axiosInstance from '../axiosConfig'; // Importation de l'instance Axios
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import '../Style/Register.css'; // Importation du fichier CSS pour le formulaire

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Pour rediriger après l'inscription

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      // Effectuer la requête POST pour s'inscrire
      const response = await axiosInstance.post('/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        role: 'user',
      });

      // Si la requête réussie, rediriger l'utilisateur vers la page de login
      navigate('/login');
    } catch (error) {
      // Gérer l'erreur en cas d'échec
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Erreur lors de l\'inscription');
      } else {
        setErrorMessage('Une erreur est survenue');
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>

      {/* Formulaire d'inscription */}
      <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>

      {/* Afficher les erreurs */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Register;
