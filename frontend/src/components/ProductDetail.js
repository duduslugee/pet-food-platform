import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ cart, setCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  const addToCart = () => {
    setCart([...cart, product]);
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <p>Tipo: {product.type}</p>
      <p>Descrição: {product.description}</p>
      <p>Peso: {product.weight}kg</p>
      <p>Preço: R${product.price}</p>
      <p>Disponível: {product.available ? 'Sim' : 'Não'}</p>
      <button onClick={addToCart}>Adicionar ao Carrinho</button>
    </div>
  );
}

export default ProductDetail;