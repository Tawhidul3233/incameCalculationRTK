import axiosInstance from "../../utils/Axios"

export const getTransactions = async () => {
  const response = await axiosInstance('/transactions');
  return response.data;
}

export const postTransaction = async (data) => {
  const response = await axiosInstance.post('/transactions', data);
  return response.data;
}

export const updateTransaction = async (id, data) => {
  const response = await axiosInstance.put(`/transactions/${id}`, data);
  return response.data;
}

export const deleteTransaction = async (id) => {
  const response = await axiosInstance.delete(`/transactions/${id}`);
  return response.data;
}