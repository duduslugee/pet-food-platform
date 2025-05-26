import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaDog, FaPlus } from 'react-icons/fa';
import './ProductList.css';

const ProductList = () => {
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/products');
      setProducts(response.data);
      toast.success('Produtos carregados com sucesso!', { position: 'top-right' });
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      toast.error('Erro ao carregar produtos: ' + (error.response?.data || error.message), { position: 'top-right' });
    }
  };

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
      console.log('Enviando produto:', newProduct);
      const response = await axios.post('http://localhost:8081/products', newProduct);
      console.log('Resposta do servidor:', response.data);
      toast.success('Produto adicionado com sucesso!', { position: 'top-right' });
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
      console.error('Erro ao adicionar produto:', error);
      const errorMessage = error.response?.data || error.message;
      toast.error('Erro ao adicionar produto: ' + errorMessage, { position: 'top-right' });
    }
  };

  return (
    <div className="product-list-container">
      <h1>Lista de Produtos</h1>
      <button className="add-button" onClick={() => setShowForm(!showForm)}>
        <FaPlus /> {showForm ? 'Fechar Formulário' : 'Adicionar Produto'}
      </button>

      {showForm && (
        <form className="product-form" onSubmit={addProduct}>
          <input
            type="text"
            name="id"
            placeholder="ID do Produto"
            value={newProduct.id}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Nome do Produto"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Tipo (ex.: Cachorro)"
            value={newProduct.type}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Peso (kg)"
            value={newProduct.weight}
            onChange={handleInputChange}
            required
            min="0"
          />
          <input
            type="number"
            name="price"
            placeholder="Preço (R$)"
            value={newProduct.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
          />
          <label>
            Disponível:
            <input
              type="checkbox"
              name="available"
              checked={newProduct.available}
              onChange={handleCheckboxChange}
            />
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
              <p>Descrição: {product.description}</p>
              <p>Peso: {product.weight} kg</p>
              <p>Preço: R$ {product.price.toFixed(2)}</p>
              <p>Disponível: {product.available ? 'Sim' : 'Não'}</p>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;