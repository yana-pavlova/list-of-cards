import { useEffect, useState } from "react";
import { Product } from "../../store/productsSlice";
import styles from './form.module.css';
import Error from '../Error/Error';

interface FormProps {
  onSubmit: (product: Product) => void;
  productToEdit?: Product | null;
}

const Form = ({ onSubmit, productToEdit }: FormProps) => {
  const [productName, setProductName] = useState('Fun fact about cats');
  const [productDescription, setProductDescription] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  const validateForm = () => {
    const urlRegex = /^(https?:\/\/)?/;

    const newErrors = {
      name: productName.trim() ? '' : 'Название продукта обязательно.',
      description: productDescription.trim() ? '' : 'Описание продукта обязательно.',
      imageUrl: productImageUrl.trim()
        ? urlRegex.test(productImageUrl)
          ? ''
          : 'Введите URL в формате https://example.com или example.com'
        : 'Ссылка на картинку обязательна.',
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      name: productName,
      description: productDescription,
      image: productImageUrl,
      isLiked: false,
      id: Date.now().toString(),
    });

    setProductName('');
    setProductDescription('');
    setProductImageUrl('');
  };

  useEffect(() => {
    if (productToEdit) {
      setProductName(productToEdit.name);
      setProductDescription(productToEdit.description);
      setProductImageUrl(productToEdit.image);
    }
  }, [productToEdit]);

  return <form className={styles.form} onSubmit={handleSubmit}>
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Название продукта</legend>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Fun fact about cats"
        />
      </label>
      {errors.name && <Error message={errors.name} />}
    </fieldset>

    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Описание продукта</legend>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Введите описание"
        />
      </label>
      {errors.description && <Error message={errors.description} />}
    </fieldset>

    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Ссылка на изображение</legend>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
          value={productImageUrl}
          onChange={(e) => setProductImageUrl(e.target.value)}
          placeholder="Введите URL изображения"
        />
      </label>
      {errors.imageUrl && <Error message={errors.imageUrl} />}
    </fieldset>

    <button className="button" type="submit">Добавить факт</button>
  </form>

};

export default Form;