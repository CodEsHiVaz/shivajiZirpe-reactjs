import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CategotyObj,
  ProductArr,
  ProductObj,
} from "../../Components/Products/types/types";
// const authToken = process.env.TOKEN;
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vYmlvdGVjaDExQGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS9Db2RFc0hpVmF6IiwiaWF0IjoxNjY0MDAwOTc1LCJleHAiOjE2NjQ0MzI5NzV9.JDXjmRj4gxjsqZQTHzsiqY5LgD_KEyhdjxHLoY3Y1Ns";

export type InitialState = {
  productList: ProductObj[] | [];
  favProduct: ProductObj[] | [];
  categories: CategotyObj[] | [];
  toggleForm: boolean;
  indiviProd: ProductObj[] | [];
};

const initialState: InitialState = {
  productList: [],
  favProduct: [],
  categories: [],
  toggleForm: false,
  indiviProd: [],
};

export const getProduct = createAsyncThunk(
  "product/getProducts",
  async (data, thunkApi) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const res = await axios.get<ProductArr[]>(
        "https://upayments-studycase-api.herokuapp.com/api/products",
        config
      );
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.massage);
    }
  }
);

export const getCategory = createAsyncThunk(
  "product/getCategory",
  async (data, thunkApi) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const res = await axios.get<ProductArr[]>(
        "https://upayments-studycase-api.herokuapp.com/api/categories",
        config
      );
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.massage);
    }
  }
);
export const toggleCategory = createAsyncThunk(
  "product/toggleCategory",
  async (cat: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const res = await axios.get<ProductArr[]>(
        `https://upayments-studycase-api.herokuapp.com/api/products`,
        config
      );
      return { ...res.data, cat };
    } catch (error: any) {}
  }
);

export const addProduct = createAsyncThunk(
  "product/addProducts",
  async (obj: any) => {
    const config: object = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const res = await axios.post<ProductArr[]>(
        "https://upayments-studycase-api.herokuapp.com/api/products",
        obj,
        config
      );
      return res.data;
    } catch (error: any) {}
  }
);
export const getIndiProduct = createAsyncThunk(
  "product/getIndiProduct",
  async (id: any) => {
    const config: object = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const res = await axios.get<ProductArr[]>(
        `https://upayments-studycase-api.herokuapp.com/api/products/${id}`,
        config
      );
      return res.data;
    } catch (error: any) {}
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<String>) => {
      const newDat = state.productList.filter((elem: ProductObj) => {
        return elem._id !== action.payload;
      });
      state.productList = newDat;
    },
    addTofavrites: (state, action: PayloadAction<ProductObj>) => {
      state.favProduct = [...state.favProduct, action.payload];
    },
    removeFromFavrites: (state, action: PayloadAction<string>) => {
      const newData = state.favProduct.filter((elem) => {
        return elem._id !== action.payload;
      });
      state.favProduct = newData;
    },
    showForm: (state, action: PayloadAction<any>) => {
      state.toggleForm = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getProduct.pending,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(
      getProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.productList = [...action.payload.products];
      }
    );
    builder.addCase(
      getProduct.rejected,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(
      toggleCategory.pending,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(
      toggleCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        const arr = [...action.payload.products];
        if (action.payload.cat !== "all") {
          const newData = arr.filter((elem: ProductObj) => {
            return elem.category === action.payload.cat;
          });

          state.productList = [...newData];
        } else {
          state.productList = [...arr];
        }
      }
    );
    builder.addCase(
      toggleCategory.rejected,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(
      getCategory.pending,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(
      getCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.categories = [...action.payload.categories];
      }
    );
    builder.addCase(
      getCategory.rejected,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(
      addProduct.pending,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(
      addProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.productList = [...state.productList, action.payload.product];
      }
    );
    builder.addCase(
      addProduct.rejected,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(
      getIndiProduct.pending,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(
      getIndiProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.indiviProd = [action.payload.product];
      }
    );
    builder.addCase(
      getIndiProduct.rejected,
      (state, action: PayloadAction<any>) => {}
    );
  },
});
export default productSlice.reducer;
export const { deleteProduct, addTofavrites, showForm, removeFromFavrites } =
  productSlice.actions;
