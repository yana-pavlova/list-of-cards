import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './productList.module.css';
import ProductCard from '../ProductCard/ProductCard';

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredProducts = showFavorites
    ? products.filter(product => product.isLiked)
    : products;

  return (
    <div className={styles.container}>
      <h1>Cats fun facts</h1>
      <div className={styles.buttonsWrapper}>
        <button type='button' className="button" onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Показать все' : 'Показать избранное'}
        </button>
        <Link className='button' to="/create-product">Добавить новый факт</Link>
      </div>
      <p>Количество продуктов: {products.length}</p>
      <ul className={styles.gallery}>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <ProductCard key={product.id} productId={product.id} isLarge={false} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
