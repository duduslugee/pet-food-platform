// src/App.js
import React from 'react';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Pet Food Platform</h1>
        <p>Encontre os melhores produtos para o seu pet!</p>
      </header>
      <ProductList />
    </div>
  );
}

export default App;