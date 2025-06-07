import React from 'react';
import { toast } from 'react-toastify'; // Remover ToastContainer
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, setCart, user }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para finalizar o pedido!', { position: 'top-right' });
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Seu carrinho está vazio!', { position: 'top-right' });
      return;
    }

    const order = {
      userId: user.id,
      productIds: cart.map((product) => product.id),
      total: parseFloat(calculateTotal()),
      status: 'PENDING',
    };
    console.log('Enviando pedido:', order);

    try {
      const response = await fetch('http://localhost:8083/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (!response.ok) throw new Error('Falha na requisição');
      const data = await response.json();
      toast.success('Pedido realizado com sucesso! Status: ' + data.status, { position: 'top-right' });
      setCart([]);
      navigate('/orders');
    } catch (error) {
      console.error('Erro detalhado:', error.message);
      toast.error('Erro ao finalizar pedido: ' + error.message, { position: 'top-right' });
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
    toast.info('Produto removido do carrinho!', { position: 'top-right' });
  };

  return (
    <div className="cart-container">
      <h2>Seu Carrinho</h2>
      {cart.length > 0 ? (
        <>
          <div className="cart-items">
            {cart.map((product) => (
              <div key={product.id} className="cart-item">
                <h3>{product.name}</h3>
                <p>Preço: R$ {product.price.toFixed(2)}</p>
                <button onClick={() => removeFromCart(product.id)}>Remover</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: R$ {calculateTotal()}</h3>
            <button onClick={handleCheckout}>Finalizar Pedido</button>
          </div>
        </>
      ) : (
        <p>Seu carrinho está vazio.</p>
      )}
    </div>
  );
};

export default Cart;