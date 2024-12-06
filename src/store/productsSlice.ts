import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  isLiked: boolean;
}

interface CatFact {
  _id: string;
  text: string;
}

interface ProductsState {
  products: Product[];
  isLoaded: boolean,
}

const initialState: ProductsState = {
  products: [],
  isLoaded: false,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const factsResponse = await fetch('https://cat-fact.herokuapp.com/facts');
    const facts: CatFact[] = await factsResponse.json();

    const imageRequests = facts.map(() =>
      fetch(`https://cataas.com/cat?${Math.random()}`)
        .then(response => response.url)
    );

    const images = await Promise.all(imageRequests);
    
    return facts.map((fact: any, index: number) => ({
      id: fact._id,
      name: 'Fun fact about cats',
      description: fact.text,
      image: images[index],
      isLiked: false,
    }));
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    toggleLike(state, action: PayloadAction<string>) {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push({
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        image: action.payload.image,
        isLiked: false,
      });
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      console.log('Products in state:', state.products);
      console.log('Product to edit:', action.payload);
      const updatedProduct = action.payload;
      console.log('ID to edit:', updatedProduct.id);
      const productIndex = state.products.findIndex((product) => product.id === updatedProduct.id);
    
      if (productIndex !== -1) {
        state.products[productIndex] = { ...state.products[productIndex], ...updatedProduct };
        console.log('Updated product:', state.products[productIndex]);
      } else {
        console.error('Product not found:', updatedProduct.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoaded = true;
    });
  },
});

export const selectProductById = (state: RootState, id: string) => 
  state.products.products.find(product => product.id === id);

export const { setProducts, toggleLike, addProduct, removeProduct, editProduct } = productsSlice.actions;

export default productsSlice.reducer;