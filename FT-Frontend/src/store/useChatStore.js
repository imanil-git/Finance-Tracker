import { create } from "zustand";

export const useChatStore = create((set) => ({
  show: false,
  loading: false,

  messages: [
    {
      sender: "ai",
      text: "Hi i am your Finance Assistant. Ask me anything about your expenses, income or savings",
    },
  ],

  openChat: () => set({ show: true }),

  closeChat: () => set({ show: false }),

  setLoading: (loading) => set({ loading }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  resetChat: () =>
    set({
      messages: [
        {
          sender: "ai",
          text: "Hi I am you Finanace Assistant.",
        },
      ],
    }),
}));
