import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteTransaction, getTransactions, postTransaction, updateTransaction } from "./TransactionAPI"

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: '',
  editing: {}
}

// create async thunks funcations 

export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
  const transactions = await getTransactions();
  return transactions;
})

export const addTransaction = createAsyncThunk('transaction/addTransaction', async (data) => {
  const transaction = await postTransaction(data);
  return transaction;
})

export const changeTransaction = createAsyncThunk('transaction/changeTransaction', async ({ id, data }) => {
  const transaction = await updateTransaction(id, data);
  return transaction;
})

export const removeTransaction = createAsyncThunk('transaction/deleteTransaction', async (id) => {
  const transaction = await deleteTransaction(id);
  return transaction;
})



// create Slice

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    isEditActive: (state, action) => {
      state.editing = action.payload;
    },
    isEditInActive: (state) => {
      state.editing = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message
      })
      .addCase(addTransaction.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload)
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message
      })
      .addCase(changeTransaction.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(changeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const index = state.transactions.findIndex(t => t.id === action.payload.id)
        state.transactions[index] = action.payload;
      })
      .addCase(changeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message
      })
      .addCase(removeTransaction.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        // console.log(action)
        state.isLoading = false;
        state.isError = false;
        state.transactions = state.transactions.filter(t => t.id !== action.meta.arg)
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message
      })
  }
})

export default transactionsSlice.reducer;
export const { isEditActive, isEditInActive } = transactionsSlice.actions;