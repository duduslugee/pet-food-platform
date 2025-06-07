import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Remover ToastContainer
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8082/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) throw new Error('Falha no cadastro');
      const data = await response.json();
      setUser(data);
      toast.success('Cadastro bem-sucedido!', { position: 'top-right' });
      navigate('/');
    } catch (error) {
      toast.error('Erro ao cadastrar: ' + error.message, { position: 'top-right' });
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;