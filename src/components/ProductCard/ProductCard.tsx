import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { toggleLike, Product, removeProduct, editProduct, selectProductById } from '../../store/productsSlice';
import styles from './productCard.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

interface ProductCardProps {
  productId: string;
  isLarge: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ productId, isLarge }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) => selectProductById(state, productId));
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();

  const handleLikeClick = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    dispatch(toggleLike(productId));
  };

  const handleRemoveClick = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    dispatch(removeProduct(productId));
    navigate('/');
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);

    if(!isLarge) navigate(`/products/${productId}`, { state: { isEditing: true } })
  };

  const handleEditSubmit = (editedProduct: { name: string, description: string, image: string }) => {
    if (!product) return;
    const updatedProduct = {
      ...product,
      ...editedProduct,
      id: product.id,
    };
    
    dispatch(editProduct(updatedProduct));
    setIsEditing(false);
  };

  useEffect(() => {
    if (location.state?.isEditing !== undefined) {
      setIsEditing(location.state.isEditing);
    }
  }, [location.state]);

  return (
    !product ? <p>Product not found</p> :
    <div className={`${styles.galleryItem} ${isLarge ? styles.galleryItemLarge : ''}`}>
      <div className={styles.imgWrapper}>
        <img src={product.image} alt="An image of a cat" />
      </div>
      <h2>{product.name}</h2>

      {isLarge && isEditing && <Form onSubmit={handleEditSubmit} productToEdit={product} />}

      <p className={isLarge ? '' : styles.twoLinesText}>{product.description}</p>

      <span className={styles.likeIconWrapper}>
        <svg
          onClick={(e) => handleLikeClick(e, product.id)} 
          className={`${styles.likeIcon} ${product.isLiked ? styles.liked : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24">
            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
        </svg>
      </span>

      <span className={styles.binIconWrapper}>
        <svg
          className={styles.binIcon}
          onClick={(e) => handleRemoveClick(e, product.id)}
          viewBox="0 0 24 24"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg">
            <path d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" />
        </svg>
      </span>

      <span className={styles.editIconWrapper}>
        <svg
          className={styles.editIcon}
          onClick={handleEditClick}
          viewBox="0 0 24 24"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg">
            <path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"/>
        </svg>
      </span>
    </div>
  );
};

export default ProductCard;