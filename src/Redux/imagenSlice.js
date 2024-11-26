import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const subirImagen = createAsyncThunk(
  'imagen/subirImagen',
  async ({ id, imagen }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;
    try {
      const response = await fetch(`http://localhost:4002/productosAdmin/subir/imagen?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imagen }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error desconocido');
      }

      return await response.text();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const imagenSlice = createSlice({
  name: 'imagen',
  initialState: {
    loading: false,
    successMessage: '',
    errorMessage: '',
  },
  reducers: {
    resetState(state) {
      state.loading = false;
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subirImagen.pending, (state) => {
        state.loading = true;
        state.successMessage = '';
        state.errorMessage = '';
      })
      .addCase(subirImagen.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
        state.errorMessage = '';
      })
      .addCase(subirImagen.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = '';
        state.errorMessage = action.payload;
      });
  },
});

export const { resetState } = imagenSlice.actions;
export default imagenSlice.reducer;