import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { selectProductById } from '../../store/productsSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './productPage.module.css';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) => selectProductById(state, id!));

  const backButton = (
    <button className={styles.backButton} onClick={() => navigate('/')}>
      Вернуться к списку продуктов
    </button>
  );

  if (!product) {
    return (
      <>
        <p>Факт не найден</p>
        {backButton}
      </>
    );
  }

  return (
    <div className={styles.container}>
      {backButton}
      <ProductCard productId={product.id} isLarge={true} />
    </div>
  );
};

export default ProductPage;
