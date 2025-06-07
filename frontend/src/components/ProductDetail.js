import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Remover ToastContainer
import { FaDog } from 'react-icons/fa';
import './ProductDetail.css';

const ProductDetail = ({ cart, setCart }) => {
  const [product, setProduct] = useState(null);
  const id = window.location.pathname.split('/')[2];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8081/products/${id}`);
        if (!response.ok) throw new Error('Produto não encontrado');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        toast.error('Erro ao carregar produto: ' + error.message, { position: 'top-right' });
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    setCart([...cart, product]);
    toast.success(`${product.name} adicionado ao carrinho!`, { position: 'top-right' });
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <FaDog className="product-icon" />
        <h2>{product.name}</h2>
        <p><strong>Tipo:</strong> {product.type}</p>
        <p><strong>Descrição:</strong> {product.description}</p>
        <p><strong>Peso:</strong> {product.weight} kg</p>
        <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
        <p><strong>Disponível:</strong> {product.available ? 'Sim' : 'Não'}</p>
        <button onClick={addToCart} disabled={!product.available}>Adicionar ao Carrinho</button>
      </div>
    </div>
  );
};

export default ProductDetail;