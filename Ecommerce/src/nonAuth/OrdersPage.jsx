import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../common/context/Authprovider';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders?userId=${user.id}&_sort=date&_order=desc`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white font-light tracking-widest">LOADING YOUR LEGACY...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-10 bg-black flex">
      {/* Luxury Video Panel (40%) */}
      <div className="hidden md:block w-2/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 z-10"></div>
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        >
          <source src="https://www.rado.com/media/sgecom_contentsystem/PDP_Images/Captain_Cook_HTC_Chronograph_chrono_bico_1920X1080.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute bottom-1/4 left-0 right-0 z-20 px-8 text-center">
          <p className="text-platinum text-white font-light tracking-widest text-lg mb-2">
            "YOUR LEGACY, DOCUMENTED"
          </p>
          <p className="text-gold text-white text-xs font-light opacity-80">
            - Master Horologist -
          </p>
        </div>
      </div>

      {/* Orders Content (60%) */}
      <div className="w-full md:w-3/5 bg-white p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl font-thin tracking-widest text-charcoal mb-2">
              YOUR ACQUISITIONS
            </h1>
            <p className="text-xs font-light text-charcoal opacity-70">
              A chronicle of your discerning taste
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-light text-charcoal mb-4">
                Your collection awaits its first masterpiece
              </p>
              <button
                onClick={() => navigate('/collection')}
                className="bg-black text-white py-2 px-6 text-xs font-light tracking-widest hover:bg-gray-800 transition-all duration-300"
              >
                EXPLORE THE COLLECTION
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className={`border border-platinum p-6 transition-all duration-300 ${selectedOrder === order.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-light text-charcoal tracking-widest">
                        ORDER #{order.id}
                      </h3>
                      <p className="text-xs font-light text-charcoal opacity-70">
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-light text-charcoal">
                        ${calculateTotal(order.items).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xxs font-light text-gold">
                        {order.status || 'COMPLETED'}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xxs font-light text-charcoal tracking-widest border-b border-platinum pb-1 mb-2">
                      <span>ITEM</span>
                      <span>DETAILS</span>
                    </div>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-platinum last:border-0">
                        <div className="flex items-center">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-12 h-12 object-cover mr-3"
                            />
                          )}
                          <div>
                            <p className="text-xs font-light text-charcoal">{item.name}</p>
                            <p className="text-xxs font-light text-charcoal opacity-70">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-xs font-light text-charcoal">
                          ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      className="text-xxs font-light text-gold hover:underline focus:outline-none"
                    >
                      {selectedOrder === order.id ? 'HIDE DETAILS' : 'VIEW DETAILS'}
                    </button>
                    <button
                      onClick={() => navigate(`/order/${order.id}`)}
                      className="text-xxs font-light text-charcoal border border-charcoal py-1 px-3 hover:bg-charcoal hover:text-white transition-all duration-300"
                    >
                      ORDER DETAILS
                    </button>
                  </div>

                  {selectedOrder === order.id && (
                    <div className="mt-4 pt-4 border-t border-platinum">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xxs font-light text-charcoal tracking-widest mb-2">SHIPPING ADDRESS</h4>
                          <p className="text-xs font-light text-charcoal">
                            {order.shippingAddress?.street}<br />
                            {order.shippingAddress?.city}, {order.shippingAddress?.state}<br />
                            {order.shippingAddress?.zip}<br />
                            {order.shippingAddress?.country}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xxs font-light text-charcoal tracking-widest mb-2">PAYMENT METHOD</h4>
                          <p className="text-xs font-light text-charcoal">
                            {order.paymentMethod === 'credit' ? 'CREDIT CARD' : order.paymentMethod?.toUpperCase()}<br />
                            {order.paymentMethod === 'credit' && `•••• •••• •••• ${order.cardDetails?.number.slice(-4)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;