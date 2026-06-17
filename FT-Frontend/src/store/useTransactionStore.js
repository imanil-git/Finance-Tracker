import { create } from "zustand";
import { fetchTransaction } from "../../helpers/axiosHelper";

export const useTransactionStore = create((set, get) => ({
  transactions: [],
  loading: false,

  pagination: {
    currentPage: 1,
    totalPages: 1,
    limit: 10,
    totalTransactions: 0,
  },

  selectedTransaction: null,

  setSelectedTransaction: (data) => set({ selectedTransaction: data }),

  //MAIN FETCH FUNCTION
  getTransactions: async (page = 1, limit = 10) => {
    set({ loading: true });

    const res = await fetchTransaction(page, limit);

    if (res.status === "success") {
      set({
        transactions: res.transactions,
        pagination: res.pagination,
      });
    }

    set({ loading: false });
  },

  // refresh current page
  refresh: () => {
    const { pagination, getTransactions } = get();
    getTransactions(pagination.currentPage, pagination.limit);
  },
}));
