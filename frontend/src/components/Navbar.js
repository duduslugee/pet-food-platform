import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Adicione esta linha

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/">Pet Food Platform</Link>
        {user && <Link to="/cart">Carrinho</Link>}
        {user && <Link to="/orders">Histórico de Pedidos</Link>}
      </div>
      <div>
        {user ? (
          <>
            <span>Bem-vindo, {user.name}</span>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Cadastrar</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;