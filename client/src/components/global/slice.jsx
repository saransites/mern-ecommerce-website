import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load initial state from local storage
const loadStateFromLocalStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (err) {
    console.error("Error loading state from local storage", err);
    return null;
  }
};

// Save state to local storage
const saveStateToLocalStorage = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("Error saving state to local storage", err);
  }
};

const initialState = {
  user: loadStateFromLocalStorage("user"),
  token: localStorage.getItem("token") || null,
  products: [],
  category: [],
  loadingProducts: false,
  loadingCategories: false,
  productsError: null,
  categoriesError: null,
};

// Thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "data/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  "data/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products/categories");
      return ["All", ...res.data];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const Slices = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      saveStateToLocalStorage("user", action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.products = [];
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProducts = true;
        state.productsError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        state.productsError = action.payload;
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loadingCategories = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loadingCategories = false;
        state.category = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loadingCategories = false;
        state.categoriesError = action.payload;
      });
  },
});


export const { setToken, setUser, logout, setProducts, setCategories } = Slices.actions;

const UseApi = (token) => {
  return axios.create({
    baseURL: import.meta.env.VITE_ENDPOINT,
    timeout: 25000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default Slices.reducer;
export { UseApi };
