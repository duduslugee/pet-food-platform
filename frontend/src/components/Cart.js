import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, setCart, user }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert('Faça login para finalizar o pedido');
      navigate('/login');
      return;
    }

    const order = {
      userId: user.id,
      productIds: cart.map((product) => product.id),
      total,
      status: 'PENDING',
    };

    try {
      const response = await fetch('http://localhost:8083/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        alert('Pedido realizado com sucesso!');
        setCart([]);
        navigate('/orders');
      } else {
        alert('Erro ao processar o pedido');
      }
    } catch (error) {
      alert('Erro ao conectar com a API');
    }
  };

  return (
    <div className="cart">
      <h2>Carrinho</h2>
      {cart.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <>
          {cart.map((product, index) => (
            <div key={index}>
              <p>{product.name} - R${product.price}</p>
            </div>
          ))}
          <p>Total: R${total}</p>
          <button onClick={handleCheckout}>Finalizar Pedido</button>
        </>
      )}
    </div>
  );
}

export default Cart;