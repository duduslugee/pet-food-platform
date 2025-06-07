import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error('Você precisa estar logado para ver seu histórico de pedidos!', { position: 'top-right' });
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/orders/user/${user.id}`);
        setOrders(response.data);
      } catch (error) {
        toast.error('Erro ao carregar pedidos: ' + (error.response?.data || error.message), { position: 'top-right' });
      }
    };
    fetchOrders();
  }, [user, navigate]);

  return (
    <div className="order-history-container">
      <h2>Histórico de Pedidos</h2>
      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <h3>Pedido #{order.id}</h3>
              <p><strong>Total:</strong> R$ {order.total.toFixed(2)}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Produtos:</strong> {order.productIds.join(', ')}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Você não tem pedidos ainda.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default OrderHistory;