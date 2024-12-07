import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import ProductList from '../components/ProductList/ProductList';
import ProductPage from '../pages/ProductPage/ProductPage';
import CreateProduct from '../pages/CreateProduct/CreateProduct';
import { fetchProducts } from '../store/productsSlice';
import Loader from '../components/Loader/Loader';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [dataIsLoading, setDataIsLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setDataIsLoading(true);
      await dispatch(fetchProducts());
      setDataIsLoading(false);
    };
  
    loadProducts();
    
  }, [dispatch]);

  return (
    dataIsLoading ? <Loader /> :
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
