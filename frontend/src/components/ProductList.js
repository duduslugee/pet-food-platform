import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FaDog, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    type: '',
    description: '',
    weight: 0,
    price: 0,
    available: true,
  });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8081/products');
      if (!response.ok) throw new Error('Falha ao carregar produtos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error('Erro ao carregar produtos: ' + error.message, { toastId: 'fetch-error', autoClose: 3000 });
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'weight' || name === 'price' ? parseFloat(value) : value;
    setNewProduct({ ...newProduct, [name]: updatedValue });
  };

  const handleCheckboxChange = (e) => {
    setNewProduct({ ...newProduct, available: e.target.checked });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error('Falha ao adicionar produto');
      toast.success('Produto adicionado com sucesso!', { toastId: 'add-product-success', autoClose: 3000 });
      setShowForm(false);
      setNewProduct({
        id: '',
        name: '',
        type: '',
        description: '',
        weight: 0,
        price: 0,
        available: true,
      });
      fetchProducts();
    } catch (error) {
      toast.error('Erro ao adicionar produto: ' + error.message, { toastId: 'add-product-error', autoClose: 3000 });
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} adicionado ao carrinho!`, { toastId: `add-to-cart-${product.id}`, autoClose: 3000 });
  };

  return (
    <div className="product-list-container">
      <h1>Lista de Produtos</h1>
      <button className="add-button" onClick={() => setShowForm(!showForm)}>
        <FaPlus /> {showForm ? 'Fechar Formulário' : 'Adicionar Produto'}
      </button>

      {showForm && (
        <form className="product-form" onSubmit={addProduct}>
          <input type="text" name="id" placeholder="ID do Produto" value={newProduct.id} onChange={handleInputChange} required />
          <input type="text" name="name" placeholder="Nome do Produto" value={newProduct.name} onChange={handleInputChange} required />
          <input type="text" name="type" placeholder="Tipo (ex.: Cachorro)" value={newProduct.type} onChange={handleInputChange} required />
          <input type="text" name="description" placeholder="Descrição" value={newProduct.description} onChange={handleInputChange} required />
          <input type="number" name="weight" placeholder="Peso (kg)" value={newProduct.weight} onChange={handleInputChange} required min="0" />
          <input type="number" name="price" placeholder="Preço (R$)" value={newProduct.price} onChange={handleInputChange} required min="0" step="0.01" />
          <label>
            Disponível:
            <input type="checkbox" name="available" checked={newProduct.available} onChange={handleCheckboxChange} />
          </label>
          <button type="submit">Salvar Produto</button>
        </form>
      )}

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <FaDog className="product-icon" />
              <h3>{product.name}</h3>
              <p>Tipo: {product.type}</p>
              <p>Preço: R$ {product.price.toFixed(2)}</p>
              <p>Disponível: {product.available ? 'Sim' : 'Não'}</p>
              <button onClick={() => navigate(`/product/${product.id}`)}>Detalhes</button>
              <button onClick={() => addToCart(product)} disabled={!product.available}>Adicionar ao Carrinho</button>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;