import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderHistory({ user }) {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetch(`http://localhost:8083/orders/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, [user, navigate]);

  return (
    <div className="order-history">
      <h2>Histórico de Pedidos</h2>
      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <p>Pedido #{order.id}</p>
            <p>Total: R${order.total}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;