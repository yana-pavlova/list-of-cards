import React from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/productsSlice';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProduct = (product: { name: string, description: string, image: string }) => {
    dispatch(addProduct({
      id: Date.now().toString(),
      name: product.name,
      description: product.description,
      image: product.image,
      isLiked: false
    }));

    navigate('/');
  };

  return (
    <div>
      <h1>Создать факт</h1>
      <Form onSubmit={handleAddProduct}/>
      <Link className="button" to="/">Вернуться к списку</Link>
    </div>
  );
};

export default CreateProduct;
